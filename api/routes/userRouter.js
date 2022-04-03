const express = require("express")
const controller = require('../models/user/controller')
const { createToken, tokenVerifierMiddleware } = require('../middleware/token-helper')

const userRouter = express.Router()

userRouter.route('/')
    .post(async (req, res) => {
        try {
            let user = await controller.createUser(req.body, createToken)
            res.status(200).send(user)

        } catch ({ message }) {
            if (message == "User validation failed: email: is already in use") {
                res.status(400).send({ error: "Email en uso" })
            } else {
                res.status(400).send({ error: message })
            }
        }
    })

//Endpoint to authenticate
userRouter.route('/authenticate')
    .post(async (req, res) => {
        const { body: { email, password } } = req

        try {
            let user = await controller.authenticateUser(email, password)
            const token = createToken(user.id)
            user.token = token
            res.json(user)

        } catch ({ message }) {
            res.status(401).send({ error: message })
        }
    })


//Endpoints for /:userId
userRouter.route('/transaction')
    .post(tokenVerifierMiddleware, async (req, res) => {
        const { body: { crypto, transactionType, value }, tokenUserId } = req
        if (!tokenUserId) {
            res.status(401).send({ error: "Unauthorized" })
        } else {
            try {
                let transaction = await controller.handleTransaction(tokenUserId, crypto, transactionType, value)
                res.status(200).send(transaction)
            } catch ({ message }) {
                res.status(401).send({ error: message })
            }
        }
    })

module.exports = userRouter
