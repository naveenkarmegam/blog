import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from 'path';

import connectDatabase from "./database/database.js";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";

import errorHandler from "./middleware/errorHandler.js";
const app = express();
dotenv.config();
const PORT = 3000;
const __dirname = path.resolve();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser())

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

connectDatabase(process.env.MONGO_URI);

app.use(express.static(path.join(__dirname, "/client/dist"))); 
app.get("*", (req, res) =>{
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`sever running on the port ${PORT}....`);
});

app.use(errorHandler);