require("dotenv").config()

const express = require('express')
const db = require("../connection/db")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

const Login_route = express.Router()

/* =====================================================
   LOGIN
===================================================== */

Login_route.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: "all input required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "password must be 6 character or higher"
            })
        }

        const check_email = "SELECT * FROM users WHERE email=?"
        const [result] = await db.query(check_email, [email])

        if (result.length === 0) {
            return res.status(404).json({
                error: "email not found"
            })
        }

        const user = result[0]

        const compare_password = await bcrypt.compare(password, user.password)

        if (!compare_password) {
            return res.status(401).json({
                error: "invalid password"
            })
        }

        req.session.user = user

        res.status(200).json({
            message: "login success",
            user: req.session.user
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

/* =====================================================
   FORGOT PASSWORD (CRYPTO)
===================================================== */

Login_route.post("/forgot-password", async (req, res) => {

    try {

        const { email } = req.body

        if (!email) {
            return res.status(400).json({ error: "email required" })
        }

        const [user] = await db.query(
            "SELECT * FROM users WHERE email=?",
            [email]
        )

        if (user.length === 0) {
            return res.status(404).json({ error: "user not found" })
        }

        // GENERATE SECURE TOKEN
        const resetToken = crypto.randomBytes(32).toString("hex")

        // 15 minutes expiry
        const expiry = new Date(Date.now() + 15 * 60 * 1000)

        // SAVE TOKEN IN DB
        await db.query(
            `UPDATE users 
             SET reset_token=?, reset_token_expiry=? 
             WHERE email=?`,
            [resetToken, expiry, email]
        )

        res.status(200).json({
            message: "reset link generated",
            resetLink: `http://localhost:5173/reset-password/${resetToken}`
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
})

/* =====================================================
   RESET PASSWORD
===================================================== */

Login_route.post("/reset-password/:token", async (req, res) => {

    try {

        const { token } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                error: "password required"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "password must be 6 characters or higher"
            })
        }

        // FIND USER BY TOKEN
        const [user] = await db.query(
            "SELECT * FROM users WHERE reset_token=?",
            [token]
        )

        if (user.length === 0) {
            return res.status(400).json({
                error: "invalid token"
            })
        }

        const dbUser = user[0]

        // CHECK EXPIRY
        if (new Date() > dbUser.reset_token_expiry) {
            return res.status(400).json({
                error: "token expired"
            })
        }

        // HASH NEW PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10)

        // UPDATE PASSWORD + CLEAR TOKEN
        await db.query(
            `UPDATE users 
             SET password=?, reset_token=NULL, reset_token_expiry=NULL 
             WHERE email=?`,
            [hashedPassword, dbUser.email]
        )

        res.status(200).json({
            message: "password updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            error: "invalid or expired token"
        })
    }
})

/* =====================================================
   LOGOUT
===================================================== */

Login_route.get("/logout", (req, res) => {

    req.session.destroy()

    res.status(200).json({
        message: "logout success"
    })
})

module.exports = Login_route