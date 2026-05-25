const express = require("express")
const reports_route = express.Router()
const db = require("../connection/db")
const Auth_middleware = require("../middleware/Authmiddleware")

reports_route.get("/report", Auth_middleware, async (req, res) => {
    try {

        const { first_date, last_date } = req.query

        if (!first_date || !last_date) {
            return res.status(400).json({
                error: "Both first_date and last_date are required"
            })
        }

        const sql = `
            SELECT 
                b.book_id,
                b.title,
                b.genre,
                b.copies_available,
                b.published_year,
                b.date,
                a.first_name,
                a.last_name,
                a.nationality
            FROM books b
            JOIN authors a ON a.author_id = b.author_id
            WHERE DATE(b.date) BETWEEN ? AND ?
            ORDER BY b.date DESC
        `

        const [rows] = await db.query(sql, [first_date, last_date])

        res.status(200).json({
            message: "Report generated successfully",
            data: rows
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = reports_route