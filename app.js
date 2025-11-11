const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const connectToDB = require("./db.config");
require("dotenv").config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const origins = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
    cors({
        origin: origins,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


app.get("/",(req,res)=>{
    res.status(200).json({success: true})
});



connectToDB().then(()=>{
        app.listen(3000,()=>{
            console.log("Server started on http://localhost:3000");
        });
}).catch((error)=>{
            console.log("//////////////     cant start server    //////////////")
            console.log(error);
        }
);