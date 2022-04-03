const User = require("../models/user")
const bcrypt = require('bcrypt')

module.exports = async () => {

    let users = await User.find({}).select('-__v').lean()

    if (users.length == 0) {
        console.log("There's no users")

        let testUserData = {
            email: "test@test.com",
            password: "test123",
        }


        let user = new User(testUserData)
        let hash = await bcrypt.hash(user.password, 10)
        user.password = hash
        let newCrypto = {
            name: "doge",
            balance: 20000,
            transactions: [
                {
                    transaction_type: "received",
                    value: 10000,
                    new_balance: 10000
                },
                {
                    transaction_type: "received",
                    value: 10000,
                    new_balance: 20000
                }
            ]
        }
        user.cryptos.push(newCrypto)
        await user.save()
        console.log("Test user created")
    }

    console.log("Boilerplate done")
    return
}
