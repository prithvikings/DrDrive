const express=require('express');
const app=express();
const userroutes=require('./routes/userroutes');



app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));



app.use("/user",userroutes);



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})