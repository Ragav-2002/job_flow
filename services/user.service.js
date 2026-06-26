const userRepository = require("../repository/user.repository")
const _ = require("lodash")
const useCrypto = require("../utils/crypto.util")
const tokenRepository = require("../repository/token.repository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userService = {}

userService.getAllUsers = async()=>{
    return userRepository.getAllUsers()
}

userService.getUser = async(id)=>{
    return userRepository.getUser(id)
}

userService.registerUser = async(body)=>{
    try{
        body = _.pick(body, ["email", "password"])
        const user = {
            ...body,
            password: await bcrypt.hash(body.password, 10),
            username: body.email
        }
        const [userData] = await userRepository.insertUser(user)
        return userData
    }catch(err){
        if (err.cause?.code === '23505') {
            throw new Error("EMAIL_ALREADY_EXIST")
        }
        throw err
    }
}

userService.loginUser = async(body)=>{
    body = _.pick(body, ["email", "password", "device"])
    const [user] = await userRepository.getUserByMail(body.email)
    if(!user) throw new Error("INVALID_USER")
    if(!await bcrypt.compare(body.password, user.password)){
        throw new Error("INVALID_PASSWORD")
    }
    const refresh_token = useCrypto.generateCrypto()
    const refresh_token_hash = useCrypto.generateCryptoHash(refresh_token)
    await tokenRepository.createToken(user.user_id, refresh_token_hash, body.device)
    const accessToken = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET)
    return {refresh_token, accessToken, user}
}

module.exports = userService