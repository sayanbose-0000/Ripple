import { cloudinaryOptions } from "../configs/config.js";
import { v2 as cloudinary } from "cloudinary";

const imageUploadingToCloudinary = async (dp, res) => {
  const imgType = dp.mimetype.split("/")[1];
  if (imgType != "jpeg" && imgType != "jpg" && imgType != "png" && imgType != "webp") {
    res.status(415).json({ message: "Image must be jpeg, jpg, png or webp" });
    return;
  }

  const imgSizekb = dp.size / 1000;
  console.log(imgSizekb);

  if (imgSizekb > 2000) {
    res.status(415).json({ message: "Image must not exceed 2mb" });
    return;
  }

  try {
    const dpUpload = `data:${dp.mimetype};base64,${dp.buffer.toString('base64')}`
    const cloudinaryResult = await cloudinary.uploader.upload(dpUpload, cloudinaryOptions);
    return cloudinaryResult.secure_url;
  }

  catch (err) {
    res.status(500).json({ message: "Error uploading dp!", err: err });
  }
}

export { imageUploadingToCloudinary };