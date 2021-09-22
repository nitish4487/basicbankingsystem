const mongoose=require("mongoose")
const Schema=mongoose.Schema

const transferSchema=new Schema({
    // id : Number,
    // accountNumber:Number,
    senderId:Number,
    senderName : String,
    senderAccountNum:String,
    receiverId:Number,
    receiverName : String,
    receiverAccountNum:String,
    transactionAmount:Number
})

module.exports=mongoose.model('Transfer',transferSchema)