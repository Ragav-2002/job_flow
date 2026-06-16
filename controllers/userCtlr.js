const db = require("../db/dzle-pool")
const { users } = require("../db/schema")
const {eq} = require("drizzle-orm")

const userController = {}

userController.getUsers = async(req, res) => {
    try{
        const response = await db.select().from(users)
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

userController.getUser = async(req, res) => {
    try{
        const response = await db.select().from(users).where(eq(users.user_id,req.params.id))
        res.json(response)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = userController