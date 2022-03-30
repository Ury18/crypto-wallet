require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const next = require('next')
const http = require("http")

const httpPort = process.env.HTTP_PORT || 80
const db_url = process.env.DB_URL
const dev = process.env.NODE_DEV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const httpServer = express()

mongoose.connect(db_url)
    .then(async () => {
        await nextApp.prepare()
        httpServer.use(bodyParser.json())
        httpServer.use(bodyParser.urlencoded({ extended: true }))

        //Handles react
        httpServer.all('*', (req, res) => {
            return handle(req, res)
        })

        http.createServer(httpServer).listen(httpPort, () => {
            console.log(`Server Running in port ${httpPort}`)
        })
    })
