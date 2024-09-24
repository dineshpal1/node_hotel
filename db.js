const mongoose =require('mongoose');
const mongoURL="mongodb://127.0.0.1:27017/hotels";
mongoose.connect(mongoURL,{});
    

const db=mongoose.connection;
db.on('connected',()=>{
    console.log("Connected to mongo db server")
});
db.on('error',(err)=>{
    console.log("Error in connectetion",err);
});
db.on('discooneted',()=>{
    console.log("mongoDb disconnected")
});
module.exports=db;
