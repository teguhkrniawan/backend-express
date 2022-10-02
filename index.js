import express from "express";
import cors from "cors";
import session from "express-session";
import dotEnv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";

dotEnv.config();
const app = express();

// (async() => [
//     await db.sync()
// ])();

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto'
    }
}));

// agar bisa diakses oleh domain tertentu
app.use(cors({
    credentials: true,
    // origin: [] // aoabila ingin lebih dari 1 domain
    origin: 'http://localhost:3000'
}))

// agar menerima data dalam JSON
app.use(express.json());

// agar bisa menggunakan routing
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
    console.log('Server backend sedang running...')
});

