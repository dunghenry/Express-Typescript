import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
dotenv.config();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
const app = express();
const port = process.env.PORT || 4000
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        })
        console.log("ConnectDB successfully!!!")
    } catch (error) {
        console.log("ConnectDB failed!!!");
        process.exit(0);
    }
}
connectDB();

app.get("/", (req, res) => {
    res.send("Hi")
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))