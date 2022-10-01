// importing modules
const express = require('express');

//const sequelize = require("sequelize");
const dotenv = require('dotenv').config();
const cookieParse = require('cookie-parser');
const db = require("./Models")
const userRoutes = require('./Routes/userRoute');


// setting up your port
const PORT = process.env.PORT || 8080

// asssign the variable app to express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParse());



db.sequelize.sync({force:true}).then(()=>{
    console.log("Db connected")
})


app.use('/api/users',userRoutes);

// listing to server connection
app.listen(PORT,()=>console.log(`server is connected ${PORT}`))

