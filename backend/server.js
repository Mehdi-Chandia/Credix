import dotenv from "dotenv";
import express from "express";
import {dbConnection} from "./configure/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import requestsRouter from "./routes/request.route.js";
import cors from "cors";

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


dbConnection()

//routes
app.use("/api/user",userRouter)
app.use("/api/request",requestsRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
