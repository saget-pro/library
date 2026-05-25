
const express = require('express');
const session = require("express-session");
const cors = require("cors");

const Register_route = require("./Auth/register");
const authors_routes = require("./Routes/Authors");
const Login_route = require("./Auth/login");
const book_route = require("./Routes/books");
const dashboard_route = require("./Routes/dashboard");
const reports_route = require("./Routes/reports");

const app = express();


// Middleware
app.use(express.json());


// FIXED CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// SESSION
app.use(session({
    secret: "mys",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));


// Routes
app.use(Register_route);
app.use(Login_route);
app.use(authors_routes);
app.use(book_route);
app.use(dashboard_route);
app.use(reports_route);


const port = 3000;

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});