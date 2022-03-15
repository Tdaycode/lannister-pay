// import asyncHandler from "express-async-handler";
// import generateToken from "../utils/generateToken.js";
// import User from "../models/lannisterModel.js";
// import jwt from "jsonwebtoken";
// import { body, validationResult } from "express-validator";
// import dotenv from "dotenv";
// dotenv.config();






// @desc    Register a new user
// @route   POST /api/users/student
// @access  Public
// const registerUserStudent = asyncHandler(async (req, res, next) => {
 
//   try {
//     const { email, name, password, confirmPassword } = req.body;
//     /* VALIDATING USER INPUT */
//     body('email').isEmail(),
//     body('password').isLength({min: 5}) 
//      const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       throw new Error({ errors: errors.array() });
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) throw new Error ('User already exists')
//     if(password !== confirmPassword) throw new Error ('Password does not match')

//     const user = await User.create({
//       name,
//       email,
//       password,
//       isStudent: true
//     });
//     const safeUser ={
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//     }
//     var jwtToken = jwt.sign({ user: safeUser }, process.env.SECRET_TOKEN, {expiresIn:'30d'});

//     return res.status(201).json({
//       user: safeUser,
//       status: 'success',
//       message: 'User registered',
//       token: `Bearer ${jwtToken}`, 
//   })

    
//   } catch (error) {
//     return res.status(400).json({
//       status: "error",
//       message: error.message,
//     })
    
//   }





  
// });

// @desc    Register a new user
// @route   POST  /api/signup/instructor
// @access  Public

// const registerUserInstructor = asyncHandler(async (req, res, next) => {
 
//   try {
//     const { email, name, profession, whyJoin, password, confirmPassword } = req.body;
//     const profile = req.files.profile;
//     const profileImage = await cloudinary.v2.uploader.upload(profile.tempFilePath) || "";
//     /* VALIDATING USER INPUT */
//     body('email').isEmail(),
//     body('password').isLength({min: 5}) 
//      const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       throw new Error({ errors: errors.array() });
//     }
//     const userExists = await User.findOne({ email });
//     if (userExists) throw new Error ('User already exists')
//     if(password !== confirmPassword) throw new Error ('Password does not match')

//     const user = await User.create({
//       name,
//       email,
//       password,
//       profession,
//       whyJoin,
//       profileImage: profileImage.secure_url || "",
//       isInstructor: true
//     });
//     const safeUser ={
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       profession: user.profession,
//       whyJoin: user.whyJoin,
//     }
//     var jwtToken = jwt.sign({ user: safeUser }, process.env.SECRET_TOKEN, {expiresIn:'30d'});

//     return res.status(201).json({
//       user: safeUser,
//       status: 'success',
//       message: 'User registered',
//       token: `Bearer ${jwtToken}`, 
//   })

    
//   } catch (error) {
//     return res.status(400).json({
//       status: "error",
//       message: error.message,
//     })
    
//   }





  
// });

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
// const authUser = asyncHandler(async (req, res) => {

//   try {
    
//   const { email, password } = req.body;
//   const user = await User.findOne({ email});
//   if(!user) throw new Error('User does not exist');
//   if(!user.matchPassword(password)) throw new Error('Incorrect password')
//   if(user && await user.matchPassword(password)){
//    return res.status(200).json({
//       _id: user._id,
//       email: user.email,
//       name: user.name,
//       status:`${user.name} logged in successfully`,
//       token: generateToken(user._id)
//     })

//   }

    
//   } catch (error) {
//     return res.status(400).json({
//       status: 'error',
//       message: error.message,

//     })
    
//   }


//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error("Invalid email or password");
//   }
// });


// @desc    Update user profile
// @route   PUT /api/users/profile/consumer
// @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.json(users);
// });

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     await user.remove();
//     res.json({ message: "User removed" });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// export {
//   authUser,
//   registerUserStudent,
//   registerUserInstructor,
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
// };
