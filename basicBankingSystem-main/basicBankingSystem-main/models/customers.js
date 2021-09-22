const mongoose=require("mongoose")
const Schema=mongoose.Schema

const customerSchema=new Schema({
    // accountNumber:Number,
    name : String,
    balance:Number,
    email:String,
    contact:Number,
    id : Number,

})

module.exports=mongoose.model('Customer',customerSchema)