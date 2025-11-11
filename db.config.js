const { default: mongoose } = require("mongoose")
require("dotenv").config();

module.exports = async ()=>{
    try {
            await mongoose.connect(process.env.DB)
    } catch (error) {
            console.log("/////////////////////  cant connect to db  //////////////////////////");
            console.log(error);
    }
}