const express = require('express');
const dashboard_route=express.Router()
const db =require("../connection/db")
const Auth_middleware=require("../middleware/Authmiddleware")

dashboard_route.get("/dashboard",Auth_middleware,async(req,res)=>{
    res.status(200).json({message:"welcome to dashboard",user:req.session.user})
})
dashboard_route.post("/logout",Auth_middleware,async(req,res)=>{
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to log out" });
            }
            res.clearCookie("connect.sid");
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})




module.exports=dashboard_route