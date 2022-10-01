// importing module
const bcrypt = require("bcrypt");

const db = require("../Models");
const jwt = require('jsonwebtoken');


// assign user to the variable User
const  User = db.users;

//signing a user up
// hasing users password before its saved to the database bcrypt
const signup = async(req,res)=>{
    try{
        const{userName,email,password}= req.body;
        const data ={
            userName,
            email,
            password: await bcrypt.hash(password,10),
        };
        // save the user
        const user = await User.create(data);

        // if user details is captured
        // generate the token with the user's and secret key in the env file 
        // set cookie with the tokem generated

        if(user){
            let token = jwt.sign({id:user.id},process.env.secretkey,{
                expiresIn: 1* 24 * 60 * 60 * 1000,
            });

        res.cookie("jwt",token,{maxAge:1* 24 * 60 *60, httpOnly:true});
        console.log("user",JSON.stringify(user,null,2));
        console.log(token);

        return res.status(201).send(user);
        }else{
            return res.status(409).send("Details are not correct");
        }
    }
        catch(error){
            console.log(error);
        }        
};    

const login = async(req,res)=>{

try{
    const {email,password}=req.body;

    //find a user by their mail
    const user = await User.findOne({email});

    // if user is found , compare password with bcrypt 
    if(user){
        const isSame = await bcrypt.compare(password,user.password);

        // if password is same generate the token 
        if(isSame){
            let token = jwt.sign({id:user.id},process.env.secretkey,{
                expiresIn:1* 24* 60 * 60 *1000,
            });

            
            // if password matches wit the one in the databae
            // generate cookies for the user
            res.cookie("jwt",token,{maxAge: 1 * 24 * 60 * 60, httpOnly:true });
            console.log("user",JSON.stringify(user,null,2));
            console.log(token);

            // send user data
            return res.status(201).send(user);


        }else{
            return res.status(401).send("Authentication faild")
        }
    }else{
        return res.status(401).send("Authentication faild")
    }
        }catch(error){
            console.log(error);
        }
    } ;
    
    module.exports={
        signup,
        login,
    };
    