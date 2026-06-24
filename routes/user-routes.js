const express = require("express")
const router = express.Router()
const {getUsers, getUser, register} = require("../controllers/userCtlr")

router.get('/', getUsers); 
router.get('/:id', getUser)
router.post('/register', register)

module.exports = router