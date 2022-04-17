import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connection.on("connected", () => {
    console.log("Connected MongoDB successfully!!");
});
mongoose.connection.on("error", (error) => {
    console.log(error.message);
});
mongoose.connection.on("disconnected", () => {
    console.log("Disconnected MongoDB successfully!!");
});
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 3000
        });
        console.log("Connect DB successfully!!")
    } catch (error) {
        console.log("Connect DB failed");
        process.exit(1);
    }
}

export default connectDB;
