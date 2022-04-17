import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
dotenv.config();
const app = express();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
const port = process.env.PORT || 4000;
connectDB();
app.get('', (req, res) => {
    res.send("Hi")
});
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));