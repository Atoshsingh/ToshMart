import mongoose from "mongoose";
const connectDB = async () => {
    console.log("waiting for connections.. ");
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully!");
    } catch (error) {
        console.error(`Error In DB Connection: ${error}`)
        process.exit(1);
    }
}

export default connectDB; 