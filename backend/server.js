require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const connectDB = require("./config/db")

const app = express()

const authRoute = require("./routes/authRoute")
const sessionRoute = require("./routes/sessionRoute")
const questionRoute = require("./routes/questionRoute")
const {
  generateInterviewQuestions,
  generateConceptExplanations
} = require("./controllers/aiController");

const { protect } = require("./middlewares/authMiddleware")

//Cors
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth", authRoute)
app.use("/api/sessions", sessionRoute)
app.use("/api/questions", questionRoute)

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions)
app.use("/api/ai/generate-explanation", protect , generateConceptExplanations)

//Server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}))

//Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))