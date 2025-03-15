const express = require('express');
const app = express();
const userroutes = require('./routes/userroutes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userroutes);



const Server=async()=>{
    try {
        await connectDB(); // Wait for the database connection to complete
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        console.error("Server not started.");
        process.exit(1); // Exit the process on connection failure
    }
}
Server();