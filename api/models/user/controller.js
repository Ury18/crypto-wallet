const User = require('./index')
const bcrypt = require('bcrypt')

controller = {

    async createUser(userData, createToken) {

        let user = new User(userData)
        let hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        createToken(user.id)

        await user.save()
        user = await User.findById(user.id).select('-__v').lean()
        user.id = user._id
        delete user._id
        delete user.password
        return user
    },

    async authenticateUser(email, password) {
        try {
            let user = await User.findOne({ email }).select('-__v').lean()
            let match = await bcrypt.compare(password, user.password)

            if (match) {
                user.id = user._id
                delete user._id
                delete user.password

                user.cryptos.forEach(crypto => {
                    delete crypto._id
                    crypto.transactions.forEach(transaction => {
                        delete transaction._id
                    })
                })

                return user

            } else {
                throw Error("Incorrrect Password")
            }

        } catch ({ message }) {
            if (message == "Cannot read property 'password' of null") throw Error("Ther's no user registered with this email")
            throw Error(message)
        }
    },

    async handleTransaction(userId, crypto, transactionType, value) {
        try {
            const availableCryptos = User.schema.path("cryptos").schema.path("name").enumValues
            const availableTransactionTypes = User.schema.path("cryptos").schema.path("transactions").schema.path("transaction_type").enumValues

            if (!availableCryptos.includes(crypto)) throw Error("Crypto not available")
            if (!availableTransactionTypes.includes(transactionType)) throw Error("Transaction type not available")

            let user = await User.findById(userId)

            if (transactionType == "received") {

                let cryptoIndex = user.cryptos.findIndex((element) => element.name == crypto)
                if (cryptoIndex == -1) {
                    let newCrypto = {
                        name: crypto,
                        balance: Number(value),
                        transactions: [{
                            transaction_type: transactionType,
                            value: Number(value),
                            new_balance: Number(value),
                        }]
                    }
                    user.cryptos.push(newCrypto)
                    user = await user.save()
                    user = await User.findById(user.id).select('-__v').lean()

                    cryptoIndex = user.cryptos.findIndex((element) => element.name == crypto)

                    let res = user.cryptos[cryptoIndex]
                    delete res._id
                    res.transactions.forEach(transaction => {
                        delete transaction._id
                    })

                    return res

                } else {
                    user.cryptos[cryptoIndex].balance = Number(user.cryptos[cryptoIndex].balance) + Number(value)
                    user.cryptos[cryptoIndex].transactions.push({
                        transaction_type: transactionType,
                        value: Number(value),
                        new_balance: user.cryptos[cryptoIndex].balance
                    })

                    await user.save()
                    user = await User.findById(user.id).select('-__v').lean()

                    let res = user.cryptos[cryptoIndex]
                    delete res._id
                    res.transactions.forEach(transaction => {
                        delete transaction._id
                    })

                    return res
                }
            }

            if (transactionType == "sent") {
                let cryptoIndex = user.cryptos.findIndex((element) => element.name == crypto)

                if (cryptoIndex == -1) {

                    throw Error(`You have no ${crypto} balance`)

                } else {

                    if (Number(user.cryptos[cryptoIndex].balance) == 0) throw Error(`You have no ${crypto} balance`)


                    let newBalance = Number(user.cryptos[cryptoIndex].balance) - Number(value)

                    if (newBalance < 0) throw Error(`You don't have enough ${crypto} for this transaction`)

                    user.cryptos[cryptoIndex].balance = newBalance
                    user.cryptos[cryptoIndex].transactions.push({
                        transaction_type: transactionType,
                        value: newBalance,
                        new_balance: user.cryptos[cryptoIndex].balance
                    })

                    await user.save()
                    user = await User.findById(user.id).select('-__v').lean()

                    let res = user.cryptos[cryptoIndex]
                    delete res._id
                    res.transactions.forEach(transaction => {
                        delete transaction._id
                    })

                    return res
                }
            }

            throw Error("Transaction type not available")

        } catch ({ message }) {
            throw Error(message)
        }
    },

}

module.exports = controller
