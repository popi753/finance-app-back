const {registerValidation,loginValidation} = require("./auth.validation")
const authModel = require("./auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerMiddleware = async (req,res,next)=>{
    try {
        const {error,value} = registerValidation.validate(req.body || {}, {abortEarly: false, errors: { wrap: { label: '' } }},)

        if (error) {
            const errorObj = {}
            error.details.forEach(element => {
                errorObj[element.path[0]] = element.message[0].toUpperCase() + element.message.slice(1)
            });
            return res.status(400).json({error : errorObj});
        };
        
        let customError = {};

        const existName = await authModel.findOne({name : value.name})
        if (existName) {
            customError.name = "User with this Name already exists";
        }
        
        const existEmail = await authModel.findOne({email : value.email})
        if (existEmail) {
            customError.email = "User with this Email already exists";
        }

        if (Object.keys(customError).length) {
            return res.status(400).json({error: customError});
        };

        req.body = value;
        console.log("validated for registration")
        next();    
    } catch (error) {
        return res.status(500).json({ error: "Failed to validate registration data" });
    }
    
};

exports.loginMiddleware = (req,res,next)=>{
    const {error,value} = loginValidation.validate(req.body || {}, {abortEarly: false, errors: { wrap: { label: '' } }},)
    if (error) {
        const errorObj = {}
        error.details.forEach(element => {
            errorObj[element.path[0]] = element.message[0].toUpperCase() + element.message.slice(1)
        });
        return res.status(400).json({error : errorObj});
    };

    req.body = value;
    console.log("validated for login")
    next();
};

exports.profileMiddleware = async (req, res, next)=>{
     try {
        const header = req.headers["authorization"] ;
        if (!header) {
            return res.status(403).json({message: "token not provided"});
        }

        const token = header.split(" ")[1];

        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("inside")

        if (!payload.userId) {
            return res.status(403).json({message: "token not verified"});
        }

        req.userId = payload.userId;

        console.log("token validated")
        next();

    } catch (error) {
        return res.status(400).json({ error: "Failed to validate token" });
    }
};