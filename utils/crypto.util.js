const crypto = require("crypto")
const useCrypto = {}
useCrypto.generateCrypto = () => {
    const refresh_token = crypto.randomBytes(32).toString('hex')
    return refresh_token
}

useCrypto.generateCryptoHash = (token) => {
    const refresh_token_hash = crypto.createHash('sha256').update(token).digest('hex')
    return refresh_token_hash
}

module.exports = useCrypto