import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./database/database.js";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser())

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

connectDatabase(process.env.MONGO_URI);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`sever running on the port ${PORT}....`);
});
