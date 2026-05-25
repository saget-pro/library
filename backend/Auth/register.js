const express=require('express');
const db=require("../connection/db")
const bcrypt=require("bcrypt")
const Register_route=express.Router();


Register_route.post("/create",async(req ,res)=>{
 try {
        const {full_name,email,password}=req.body;
        if(!full_name||!email||!password){
            return res.status(400).json({error:"all input required"})
        }
        if(password.length<6){
            return res.status(400).json({error:"please password must be 6 character or higher"})
        }

        const check_email="SELECT * FROM `users` WHERE email=?"
        const[result]=await db.query(check_email,[email])
        if(result.length >0){
            return res.status(409).json({error:"email taken try another"})
            
        }
        const hash_password= await bcrypt.hash(password,10)
        const sql="INSERT INTO `users`(`full_name`, `email`, `password`) VALUES (?,?,?)"
        const [insert]=await db.query(sql,[full_name,email,hash_password])
        if(insert){
            res.status(201).json({message:"new user created well"})
        }
 } catch (error) {
    return res.status(500).json({error:error.message})
    
 }
 
});
module.exports=Register_route