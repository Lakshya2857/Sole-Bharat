import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`SuccssFully Connected DATABASE ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error while Connecting DB", error)
    }
}

export default connectDB;