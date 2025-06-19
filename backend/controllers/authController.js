const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const registerUser = async(req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body

        const userExits = await User.findOne({ email })
        if(userExits) return res.status(400).json({ message: "User already exists"})

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        })
        return res.status(201).json({ 
            message: "User Created",
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error!", error: error.message})
    }
}

const loginUser = async(req, res) => {
    try {
        const { email,password } = req.body

        const user = await User.findOne({ email })

        if(!user) return res.status(500).json({ message: "User does not Exits"})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch || user.email != email) return res.status(500).json({ message: "Invalid Email Or Password"})

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl : user.profileImageUrl,
            token: generateToken(user._id)
        })
    } catch (error) {
         return res.status(500).json({ message: "Server Error!", error: error.message})
    }
}

const getUserProfile = async(req, res) => {
    try {
        const user = await User.findOne({_id : req.user.id}).select("-password")
        console.log("heyyy");
        

        if(!user) return res.status(500).json({ message: "User not found"})

        res.json(user)

    } catch (error) {
         return res.status(500).json({ message: "Server Error!", error: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
}