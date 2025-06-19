const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log("Mongo DB Connected");
    } catch (error) {
        console.error("Error connection to Mongo", error)
        process.exit()
    }
}

module.exports = connectDB