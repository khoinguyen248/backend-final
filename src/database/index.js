import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
    try {
        mongoose.connect(process.env.DB_connect)
        console.log("server is connected!")
    } catch (error) {
        console.log(error)
}
}

export default connectDB