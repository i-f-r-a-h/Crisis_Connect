// This file defines the 'User' model using Mongoose for MongoDB.

import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 3,
    },
  },
  { timestamps: true }
);

  const User = mongoose.model("User", UserSchema);
  export default User;