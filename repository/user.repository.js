const { eq } = require("drizzle-orm")
const db = require("../db/dzle-pool")
const { users } = require("../db/schema")

const userRepository = {}

userRepository.getAllUsers = async()=>{
    return db.select().from(users)
}

userRepository.getUserByID = async(id)=>{
    return db.select().from(users).where(eq(users.user_id, id))
}

userRepository.getUserByMail = async(email)=>{
    return db.select().from(users).where(eq(users.email, email))
}

userRepository.insertUser = async(body)=>{
    return db.insert(users).values({
        username: body.email,
        email: body.email,
        password: body.password
    }).returning()
}


module.exports = userRepository