import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import UserModel from "../models/UserModel.js";
import { NODE_ENV, JWT_SECRET } from "../configs/config.js";
import { imageUploadingToCloudinary } from "../helpers/helper.js";

const signup = (req, res) => {
  const { email, username, password } = req.body;
  const dp = req.file;

  if (!email || !username || !password || !dp) {
    res.status(400).json({ message: "Username, email, password and dp required!" });
    return;
  }

  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    if (err) {
      res.status(500).json({ message: "Error hashing password!", err: err });
      return;
    }

    try {
      const dpSecureUrl = await imageUploadingToCloudinary(dp, res);

      const userSignupDoc = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        dpUrl: dpSecureUrl
      })

      try {
        var token = jwt.sign({ username: userSignupDoc.username, email: userSignupDoc.email }, JWT_SECRET);

        res.cookie('token', token, {
          path: '/',
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // token valid for a month
          sameSite: NODE_ENV === "Development" ? "lax" : "none",
          secure: NODE_ENV !== "Development"
        })

        res.status(201).json({ message: "Singup successful" });
      }

      catch (err) {
        res.status(500).json({ message: "Error signing token", err: err });
        return;
      }
    }

    catch (err) {
      res.status(500).json({ message: "Error contacting database!", err: err });
      return;
    }
  })

}

export { signup };