import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const PORT = process.env.PORT;
const FRONT_URL = process.env.FRONT_URL;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: FRONT_URL,
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

const storage = multer.memoryStorage();
const UPLOAD = multer({ storage: storage });

export { PORT, FRONT_URL, corsOptions, MONGO_URI, UPLOAD };