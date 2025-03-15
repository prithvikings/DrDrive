const express=require('express');
const router=express.Router();
const {body, validationResult}=require('express-validator');
const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const jwt = require('jsonwebtoken');
router.get("/register",(req,res)=>{
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            email: email,
            password: hashedPassword,
            userName: username //corrected username to userName
        });
        res.status(200).json({
            message: "User created successfully",
            user: { email, userName: username } //corrected username to userName
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User
    .findOne({ userName: username })
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token =jwt.sign(
        { userId: user._id, 
        userName: user.userName,
        email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful", user: { userName: user.userName, email: user.email } });
});

module.exports=router;