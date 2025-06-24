const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register User
const registerUser = async (req, res) => {
  try {
    //console.log(req.body)
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      if (req.file) fs.unlinkSync(req.file.path); // delete temp file
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profileImageUrl = "";

    // Upload to Cloudinary if file is present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user-profiles",
      });
      profileImageUrl = result.secure_url;

      fs.unlinkSync(req.file.path); // delete local file after upload
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    return res.status(201).json({
      message: "User Created",
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Email or Password" });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server Error!", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};

