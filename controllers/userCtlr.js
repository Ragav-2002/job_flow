const db = require("../db/dzle-pool")
const { users } = require("../db/schema")
const {eq} = require("drizzle-orm")
const _ = require("lodash")
const bcrypt = require("bcrypt")

const userController = {}

userController.getUsers = async(req, res) => {
    try{
        const response = await db.select().from(users)
        res.status(200).json({success: true, data: response})
    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

userController.getUser = async(req, res) => {
    try{
        const response = await db.select().from(users).where(eq(users.user_id,req.params.id))
        res.status(200).json({sucess: true, data: response})
    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}


userController.register = async(req, res)=>{
    try{
        const body = _.pick(req.body, ["email", "password"])
        body.password = await bcrypt.hash(body.password, 10)
        body.username = body.email
        const response = await db.insert(users).values(body).returning()
        res.status(201).json({data: response[0], success: true})
    }
    catch(e){
        if (e.cause.code === '23505') {
            return res.status(400).json({ success: false, error: 'email already exists'});
        }
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

userController.login = async(req, res)=>{
    try{
        const body = _.pick(req.body, ["email", "password"])
        const [user] = db.select().from(users).where(eq(users.email, body.email))
        if(!user) return res.status(404).json({success: false, error: "invalid email or password"})
        if(!await bcrypt.compare(body.password, user.password)){
            return res.status(401).json({success: false, error: "invalid email or password"})
        }
        
    }catch(e){

    }
}

module.exports = userController