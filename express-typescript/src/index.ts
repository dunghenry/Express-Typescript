import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB';
import routes from './routes';
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
app.use(cookieParser());
const port = process.env.PORT || 4000;
connectDB();
app.use("/api/v1", routes);
app.listen(port, () => console.log(`App listening on http://localhost:${port}`));