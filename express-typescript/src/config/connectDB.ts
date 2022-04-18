import mongoose from "mongoose";
import logEvents from '../helpers/logEvents';
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: false,
        });
        console.log("Connect DB successfully!!")
    } catch (error) {
        console.log("Connect DB failed");
        await logEvents(error.message);
        process.exit(1);
    }
}
mongoose.connection.on("connected", () => {
    console.log("Connected MongoDB successfully!!");
});
mongoose.connection.on("error", async (error) => {
    if (error) {
        console.log("Connect DB error");
        await logEvents(error.message);
        process.exit(-1);
    }
});
mongoose.connection.on('disconnecting', () => {
    console.log("Disconnecting MongoDB successfully!!");
});
mongoose.connection.on('disconnected', () => {
    console.log("Disconnected MongoDB successfully!!");
});
process.on('SIGINT', async () => {
    console.log("Killed server");
    await mongoose.connection.close();
    process.exit(0);
});
export default connectDB;
