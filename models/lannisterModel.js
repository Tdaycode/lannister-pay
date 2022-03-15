import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: ""
    },
   email: {
      type: String,
      default: "",
    },
    profession:{
      type: String,
      default: ""
    },
    profileImage:{
      type: String,
      default: ""
    },
    whyJoin:{
      type: String,
      default: ""
    },
    isStudent:{
      type: Boolean,
      default: false
    },
    isInstructor:{
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);





const User = mongoose.model("User", userSchema);

export default User;
