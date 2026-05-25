const express = require('express');
const db=require("../connection/db")
const Auth_middleware=require("../middleware/Authmiddleware")
const book_route=express.Router()


book_route.post("/book",Auth_middleware,async(req ,res)=>{
    try {
       const {title,isbn,genre,copies_available,published_year,author_id,}=req.body
       if(!title||!isbn||!genre||!copies_available||!published_year||!author_id){
        return res.status(400).json({error:"all input required"})
       } 
       if(isNaN(isbn)||isNaN(copies_available)|| isNaN(published_year)){
        return res.status({error:"isbin,copie and published_year must be number"})
       }
       const check_autho_id= "SELECT * FROM `authors` WHERE author_id=?"
       const [result]=  await db.query(check_autho_id,[author_id])
       if(result.length ===0){
        return res.status(404).json({error:"not auth availbale to this autho_id"})
       }
       const sql="INSERT INTO `books`(`title`, `isbn`, `genre`, `copies_available`, `published_year`, `author_id`) VALUES (?,?,?,?,?,?)"
       const [insert]= await db.query(sql,[title,isbn,genre,copies_available,published_year,author_id])
       res.status(201).json({message:"new book recorded"})
    } catch (error) {
      return res.status(500).json({error:error.message})  
    }
})

//select the books with author details

book_route.get("/get_book",Auth_middleware,async(req,res)=>{
    try {
        const sql="SELECT b.*,a.first_name,a.nationality FROM books b JOIN authors a ON a.author_id=b.author_id"
        const [result]= await db.query(sql)
        res.status(200).json(result)
    } catch (error) {
       return res.status(500).json({error:error.message}) 
    }
})

//update book
book_route.put("/update_book/:id", Auth_middleware, async (req, res) => {
    try {
        const { id } = req.params
        const { title, isbn, genre, copies_available, published_year, author_id } = req.body
        const sql = "UPDATE `books` SET `title`=?, `isbn`=?, `genre`=?, `copies_available`=?, `published_year`=?, `author_id`=? WHERE book_id=?"
        
        // FIX: Added author_id to the array before id
        const [insert] = await db.query(sql, [title, isbn, genre, copies_available, published_year, author_id, id])
        
        if (insert.affectedRows === 0) {
            return res.status(404).json({ error: "id not found" })
        }
        res.status(200).json({ message: "book updated success" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

//try to delete book
book_route.delete("/delete_book/:id",Auth_middleware,async(req,res)=>{
    try {
        const {id}=req.params
        const sql="DELETE FROM `books` WHERE book_id=?"
        const [result]= await db.query(sql,[id])
        if(result.affectedRows ===0){
            return res.status(404).json({error:"id not found"})
        }
        res.status(200).json({message:"book deleted success"})
    } catch (error) {
       return res.status(500).json({error:error.message}) 
    }
})

module.exports=book_route