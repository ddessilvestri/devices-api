const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");


const createUser = async(req,res = response)=>{
  try {
    const {email,password} = req.body;
    
    const existentEmail = await User.findOne({email});
    if(existentEmail){
        return res.status(400).json({
            ok:false,
            msg:'The email already exists'
        })
    }
    const user = new User(req.body);

    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt);

    // Save passowrd in DB
    await user.save();

    // TODO : Generate JWT
    const token = await generateJWT(user.id);

    res.json({
        ok:true,
        user,
        token
    });



  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg:'Refer to the administrator'
    });
  }
}

const login = async(req,res)=>{
   
    const {email,password} =req.body;

    try {
        const userDB = await User.findOne({email});
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg: "Email or password not valid"
            })
        }
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'Email or password not valid'
            })
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok:true,
            user: userDB,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Refer to the administrator'
        });
    }

    
}


const renewToken = async(req,res)=>{
    const uid = req.uid;

    //generate new jwt
    const token = await generateJWT(uid);
    // get the user by uid
    const user = await User.findById(uid);
    res.json({
        ok:true,
        token,
        user
    })
} 

module.exports={
    createUser,
    login,
    renewToken
}