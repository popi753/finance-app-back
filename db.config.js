const { default: mongoose } = require("mongoose")
require("dotenv").config();


module.exports = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('////////////     Using existing MongoDB connection       ////////////');
    return;
  }

  try {
    await mongoose.connect(process.env.DB, {
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000
    });
    console.log("/////////////////////  MongoDB connected  //////////////////////////");
    
    mongoose.connection.on('error', (err) => {
        throw err
    });
    
    mongoose.connection.on('disconnected', () => {
        throw new Error('MongoDB disconnected');
    });
  } catch (error) {
    console.error('///////////////    MongoDB connection error:', error);
    throw error;
  }
};

