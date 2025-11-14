const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require("cors");
const connectToDB = require("./db.config");
require("dotenv").config();

const authRouter = require("./auth/auth.controller.js");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const origins = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
    cors({
        origin: origins,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
    })
);


app.get("/",(req,res)=>{
    res.status(200).json({success: true})
});

app.use("/auth", authRouter);


// connectToDB().then(()=>{
//         app.listen(process.env.PORT || 3000,()=>{
//             console.log("Server started on http://localhost:3000");
//         });
// }).catch((error)=>{
//             console.log("//////////////     cant start server    //////////////")
//             console.log(error);
//         }
// );

connectToDB().then(()=>{
            console.log("//////////////     connected to db    //////////////");
}).catch((error)=>{
            console.log("//////////////     cant start server    //////////////");
            console.log(error);
            return;
        }
);



module.exports = app;