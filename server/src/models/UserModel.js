import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  dpUrl: {
    type: String,
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("ripple-user", UserSchema);
export default UserModel;