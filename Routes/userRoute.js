// import module
const express = require('express');
const userController = require("../Controllers/userController");
const {signup,login} = userController
const userAuth = require("../Middleware/userAuth")

const router = express.Router();

// signup end point 
router.post('/signup',userAuth.saveUser,signup)


//login 
router.post('/login',login)

module.exports =router;