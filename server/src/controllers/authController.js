import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/UserModel.js";

const signup = (req, res) => {
  const { email, username, password } = req.body;
  const dp = req.file;

  if (!email || !username || !password || !dp) {
    res.status(400).json({ message: "Username, email, password and dp required!" });
    return;
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ message: "Error signing up!" });
    }

    try {
      const userSignupDoc = UserModel.create({
        username,
        email,
        password: hashedPassword
      })

      // var token = 
      
    }
    catch (err) {
      res.status(500).json({ message: "Error signing up!" });
    }
  })

}

export { signup };