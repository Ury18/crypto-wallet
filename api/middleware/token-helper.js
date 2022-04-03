require('dotenv').config()
const jwt = require('jsonwebtoken')
const userController = require('../models/user/controller')

const tokenHelper = {
    jwtSecret: process.env.JWT_SECRET,

    createToken(userId, ttl) {
        return jwt.sign({ sub: userId }, this.jwtSecret, { expiresIn: ttl || '4h' })
    },

    verifyToken(token) {
        const { sub } = jwt.verify(token, this.jwtSecret)

        if (!sub) {
            throw Error(`Subject not present in ${Token}`)
        }

        return sub
    },

    propagateRequestInfo(req, res, next, token) {
        try {
            const userId = this.verifyToken(token)
            req.tokenUserId = userId
            next()
        } catch ({ message }) {
            req.tokenUserId = null
            next()
        }
    },

    tokenVerifierMiddleware(req, res, next) {
        const { headers: { authorization } } = req
        if (authorization) {
            console.log(authorization)
            const token = authorization.substring(7)
            this.propagateRequestInfo(req, res, next, token)
        } else {
            req.tokenUserId = null
            next()
        }

    }

}

const { createToken, verifyToken, tokenVerifierMiddleware } = tokenHelper

tokenHelper.createToken = createToken.bind(tokenHelper)
tokenHelper.verifyToken = verifyToken.bind(tokenHelper)
tokenHelper.tokenVerifierMiddleware = tokenVerifierMiddleware.bind(tokenHelper)

module.exports = tokenHelper
