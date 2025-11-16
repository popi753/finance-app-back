const jwt = require("jsonwebtoken");
const authModel = require("./auth.model.js");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req,res)=>{
    try {
        const {name,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await authModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const payload = {
            userId: newUser._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});

        console.log("registered");
        res.status(201).json({success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: {message: "Could not register user, please try later"}});        
    }
};

exports.login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await authModel.findOne({email}).select("password");
        if (!user) {
            return res.status(400).json({error: {message:"Email or Password is incorrect"}})
        };

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(400).json({error: {message:"Email or Password is incorrect"}})
        };

        const payload = {
            userId: user._id
        };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});
        
        console.log("logged in");
        res.status(201).json({success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: {message : "Failed to login, please try later"} });
    }
};

exports.profile = async (req,res)=>{
    try {
            const user = await authModel.findById(req.userId);
            if (user) {
                res.status(200).json(user);
            }else{
                res.status(404).json({error : {message : "could not find profile"}})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error : {message : "could not find profile"}})
        }
};

