import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { NODE_ENV, JWT_SECRET } from "../configs/config.js";
import { imageUploadingToCloudinary } from "../helpers/CloudinaryUpload.js";
import { v2 as cloudinary } from "cloudinary";

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

    let dp_public_id;

    try {
      const dpresult = await imageUploadingToCloudinary(dp, res);
      const dpSecureUrl = dpresult.dpSecureUrl;
      dp_public_id = dpresult.dp_public_id;

      const userSignupDoc = await UserModel.create({
        username,
        email,
        password: hashedPassword,
        dpUrl: dpSecureUrl
      })

      try {
        var token = jwt.sign({ username: userSignupDoc.username, email: userSignupDoc.email, dp: userSignupDoc.dpUrl }, JWT_SECRET);

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
      res.status(500).json({ message: "User already exists! Please Login!", err: err });
      cloudinary.uploader.destroy(dp_public_id);
      return;
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLoginDoc = await UserModel.findOne({ email });

    if (!userLoginDoc) {
      res.status(401).json({ message: "User doesn't exist" });
      return;
    }

    const passwordIsOkay = await bcrypt.compare(password, userLoginDoc.password);

    if (passwordIsOkay) {
      var token = jwt.sign({ username: userLoginDoc.username, email: userLoginDoc.email, dp: userLoginDoc.dpUrl }, JWT_SECRET);
      res.cookie("token", token, {
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30, // token valid for a month
        sameSite: NODE_ENV === "Development" ? "lax" : "none",
        secure: NODE_ENV !== "Development"
      });

      res.status(200).json({ message: "Login successful!" });
    }

    else {
      console.log("Pass not founds")
      res.status(401).json({ message: "Incorrect Credentials" });
    }
  }

  catch (err) {
    res.status(500).json({ message: "Internal Server Error", err: err });
  }
}


const profile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    const profileInfo = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: profileInfo });
  }

  else {
    res.status(401).json({ message: "Error signing token" });
    return;
  }
}

const search = async (req, res) => {
  const emailorusername = req.query.emailorusername;
  // console.log(emailorusername);
  const userSearchDoc = await UserModel.find({
    $or: [ // $or will search either email or username
      { email: { $regex: `^${emailorusername}`, $options: "i" } }, // for partial search that is if I type abc, all people with abc in their email, username shows eg, abc0000@gmail.com, abcdefg@gmail.com etc.
      { username: { $regex: `^${emailorusername}`, $options: "i" } } // ^ starts searching from first character and not from middle.
      // options: "i" is for case insensitive search
    ]
  });

  const searchResult = userSearchDoc.map(item => ({
    id: item._id,
    dp: item.dpUrl,
    username: item.username,
    email: item.email,
  }))

  // console.log(userSearchDoc);
  res.status(200).json({ message: searchResult });
}

export { signup, login, profile, search };