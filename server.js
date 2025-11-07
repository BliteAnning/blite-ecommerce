import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';



const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json({limit: '10mb'}));
app.use(cookieParser());

//routes
app.use("/api", userRouter)


const PORT = process.env.PORT || 8000;
connectDB().then (()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("DB connected");
    
});
})
