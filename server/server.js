import express from 'express';
import authRoutes from './src/routers/authRouter.js';
import cookieParser from 'cookie-parser';
import { corsOptions, PORT, MONGO_URI, UPLOAD } from './src/configs/config.js';
import cors from "cors";
import mongoose from "mongoose";

const app = express();
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB: \n", err));

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});