const UserRouter = require('./userRouter')

const routers = [
    {
        router: UserRouter,
        path: "users"
    }
]

module.exports = routers
