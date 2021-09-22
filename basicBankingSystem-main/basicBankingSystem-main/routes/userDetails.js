const express=require("express")
const router=express.Router()
const Customer=require('../models/customers')
const Transfer=require('../models/transfer')



router.get("/", async(req, res) => {
    const customers=await Customer.find({})
    // console.log(customers)
    res.render("user/userDetails",{customers});
  });
  
  router.get("/:id", async(req, res) => {
    const {id} = req.params
    const customer = await Customer.findById(id)
    const transactions=await Transfer.find({})
    // console.log(transactions)
    // console.log(customer)
    res.render("user/passbook",{customer,transactions});
  });
  router.get("/:id/transfer", async(req, res) => {
    const {id} = req.params
    const customers=await Customer.find({})
  
    res.render("user/transfer",{customers,id});
  });
  
  router.get('/:id/transfer/:receiverId/',async(req,res)=>{
    const {id,receiverId}=req.params
    const sender=await Customer.findById(id)
    const receiver=await Customer.findById(receiverId)
    res.render("user/transactionAmount",{sender,receiver})
  
  })
  
  router.post('/:id/transfer/:receiverId',async(req,res)=>{
    const {id,receiverId}=req.params
    const amount=req.body.amount
    const sender=await Customer.findById(id)
    const receiver=await Customer.findById(receiverId)
    sender.balance-=amount
    receiver.balance=receiver.balance+parseInt(amount)
    await sender.save()
    await receiver.save()
    const transferTable=new Transfer({
      senderId:sender.id,
      senderAccountNum:id,
      senderName:sender.name,
      receiverId:receiver.id,
      receiverAccountNum:receiverId,
      receiverName:receiver.name,
      transactionAmount:amount
    })
    await transferTable.save()
    res.redirect(`/userDetails/${sender._id}`)
  })
   


module.exports=router