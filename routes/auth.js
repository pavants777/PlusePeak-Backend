const express = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const authRouter = express.Router();

// app sign in 

authRouter.post('/api/signup',async (req,res)=>{
    try {
        const {name,email,password} = req.body;
    
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({msg : "User with Email Alerady exited"});
        }

        const hashPassword = await bcryptjs.hash(password,8)

        user = User({
            name,
            email,
            password : hashPassword,
        });

        user = await user.save();
        const token = jwt.sign({id : user._id},"PasswordKey");
        res.json({token,...user._doc});
    } catch (e) {
        res.status(500).json({msg : e.message});
    }
});


// app login 

authRouter.post('/api/signin',async (req,res)=>{
    try {
        const {email,password } = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg : "User with this Email doesn't exits"})
        }

        const isMatch = await bcryptjs.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg : "Invalid Password"});
        }

        const token = jwt.sign({id : user._id},"PasswordKey");
       res.json({token,...user._doc});
    } catch (e) {
        res.status(500).json({msg : e.message})
    }
})

module.exports = authRouter;
