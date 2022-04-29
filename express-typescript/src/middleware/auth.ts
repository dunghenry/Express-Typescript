import jwt from 'jsonwebtoken';
import logEvents from '../helpers/logEvents';
const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = req.headers.token.split(' ')[1];
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.userId;
            // console.log(req)
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError")
                return res.status(401).json("Token expired");
            await logEvents(error.message, module.filename);
            return res.status(403).json("Token invalid");
        }
    }
    else {
        await logEvents("Token not found", module.filename);
        return res.status(401).json("Token not found")
    }
}

export default verifyToken;