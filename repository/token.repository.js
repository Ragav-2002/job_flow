const db = require("../db/dzle-pool")
const { tokens } = require("../db/schema")

const tokenRepository = {}

tokenRepository.createToken = async(user_id, token_hash, device) => {
    return db.insert(tokens).values({
        user_id: user_id,
        token_hash: token_hash,
        device: device,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
}

module.exports = tokenRepository

