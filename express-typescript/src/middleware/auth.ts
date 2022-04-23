import jwt from 'jsonwebtoken';
import logEvents from '../helpers/logEvents';
const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = req.headers.token.split(' ')[1];
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            await logEvents(error.message);
            return res.status(403).json("Token invalid");
        }
    }
    else {
        await logEvents("Token not found");
        return res.status(401).json("Token not found")
    }
}

export default verifyToken;