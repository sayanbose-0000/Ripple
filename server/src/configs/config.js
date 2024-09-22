import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
dotenv.config();


const PORT = process.env.PORT;
const FRONT_URL = process.env.FRONT_URL;
const MONGO_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

const corsOptions = {
  origin: FRONT_URL,
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

const UPLOAD = multer({ storage: storage });

const cloudinaryOptions = {
  folder: "ripple-users-dp",
  use_filename: true,
  unique_filename: false,
  overwrite: true,
}

export { PORT, FRONT_URL, corsOptions, MONGO_URI, UPLOAD, NODE_ENV, JWT_SECRET, cloudinaryOptions };