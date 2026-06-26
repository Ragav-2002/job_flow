const db = require("../db/dzle-pool")
const { users } = require("../db/schema")
const {eq} = require("drizzle-orm")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const userService = require("../services/user.service")
const getDeviceName = require("../utils/device.util")
const cookieOptions = require("../config/cookie")

const userController = {}

userController.getUsers = async(req, res) => {
    try{
        const response = await userService.getAllUsers()
        res.status(200).json({success: true, data: response})
    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

userController.getUser = async(req, res) => {
    try{
        const response = await userService.getUser(req.params.id)
        res.status(200).json({sucess: true, data: response})
    } catch (error) {
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

userController.register = async(req, res)=>{
    try{
        const data = await userService.registerUser(req.body)
        res.status(201).json({data: data, success: true, message: "registration successful"})
    }
    catch(err){
        if (err?.message === "EMAIL_ALREADY_EXIST") {
            return res.status(400).json({ success: false, error: 'email already exists'});
        }
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

userController.login = async(req, res)=>{
    try{
        const body = req.body
        req.device = getDeviceName(req.headers["user-agent"])
        const {refresh_token, access_token, user} = await userService.loginUser(body)
        res.cookie("refresh_token", refresh_token, cookieOptions)
        res.status(200).json({success: true, data: [user], message: "login successful"})
    }catch(err){
        console.error(err)
        if(err.message === 'INVALID_USER'){ 
            return res.status(404).json({success: false, error: "invalid email or password"})
        }
        if(err.message === 'INVALID_PASSWORD'){
            return res.status(401).json({success: false, error: "invalid email or password"})
        }
        res.status(500).json({ success: false, error: "something went wrong" })
    }
}

module.exports = userController