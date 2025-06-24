const express = require("express")
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController")
const { protect } = require("../middlewares/authMiddleware")
const upload  = require("../middlewares/uploadMiddleware")

const router = express.Router()

router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile)

module.exports = router;