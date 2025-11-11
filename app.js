const express = require('express');
const path = require('path');
const logger = require('morgan');
const connectToDB = require("./db.congig");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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