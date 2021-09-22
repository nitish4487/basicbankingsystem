const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const mongoose = require("mongoose");

const userRouter=require('./routes/userDetails')

mongoose
  .connect("mongodb://127.0.0.1:27017/bankingSystem", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((e) => console.log(e));

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use('/userDetails',userRouter)

app.get("/", (req, res) => {
  res.render("home");
});



app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
