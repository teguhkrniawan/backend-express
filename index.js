import express from "express";
import cors from "cors";
import session from "express-session";
import dotEnv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotEnv.config();
const app = express();

// untuk membuat session store ke db, agar ketika server restart tidak terlogout otomatis
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// (async() => {
//     await db.sync();
// })();

// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// agar bisa diakses oleh domain tertentu
// app.use(cors({
    // credentials: true,
    // origin: "*" // aoabila ingin lebih dari 1 domain
    // origin: 'http://localhost:3000'
// }))

app.use(cors({
    origin: true,
    credentials: true
}));

// agar menerima data dalam JSON
app.use(express.json());

// agar bisa menggunakan routing
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// session store ke db
// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server backend sedang running...')
});

