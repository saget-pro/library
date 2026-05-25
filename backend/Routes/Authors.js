const express = require('express');
const db=require("../connection/db")
const Auth_middleware=require("../middleware/Authmiddleware")
const authors_routes=express.Router()

authors_routes.post("/author",Auth_middleware,async(req ,res)=>{
    try {
        const {first_name,last_name,nationality,bio}=req.body
        if(!first_name||!last_name||!nationality||!bio){
            return res.status(400).json({error:"all input required"})
        }
        if(!isNaN(nationality)){
            return res.status({error:"nationality can not be number"})
        }
        const sql="INSERT INTO `authors`(`first_name`, `last_name`, `nationality`, `bio`) VALUES (?,?,?,?)"
        const [insert]= await db.query(sql,[first_name,last_name,nationality,bio])
        res.status(201).json({message:"new author registered"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})

authors_routes.get("/authors",Auth_middleware,async(req,res)=>{
    try {
        const sql="SELECT * FROM `authors`"
        const [authors]= await db.query(sql)
        res.status(200).json({authors})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
})


module.exports=authors_routes