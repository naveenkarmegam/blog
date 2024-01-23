import express from "express";
import dotenv from 'dotenv';

import connectDatabase from "./database/database.js";

import userRoute from './routes/user.route.js'
const app = express();
dotenv.config()
const PORT = 3000
   
app.use(express.json());
app.use('/api/user',userRoute)
connectDatabase(process.env.MONGO_URI) 
app.listen(PORT,()=>{
    console.log(`sever running on the port ${PORT}....`)
})