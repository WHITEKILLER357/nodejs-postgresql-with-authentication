// import module
const express = require("express");

const db = require("../Models");

// Assign Db.user to User variable 
const User = db.users;

// function to check if userName or email existing in the database
// this is to avoid having two users with the same Username and email
const saveUser = async(req,res,next)=>{
    // search the database to see if user exit
    try{
        const username = await User.findOne({
            where:{
                userName: req.body.userName,
            },
        });
        // if username exit in the database response with a status 409
        if (username){
            return res.json(409).sed("UserName already taken");
        }

        const emailcheck = await User.findOne({
            where:{
                email:req.body.email,
            },
        });

        if (emailcheck){
            return res.json(409).sed("Authentication failed")
        }

        next();
    }catch (error){
        console.log(error);
    }

};


// exporting module
module.exports={
    saveUser,
};

