import User from "../models/User";
import logEvents from '../helpers/logEvents';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userController = {
    getAllUsers : async (req, res) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})
    },
    createUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                password: hashed
            });
            const token = userController.generateAccessToken(user);
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error);
        }
    },
    login: async (req, res) => {
        if(!req.body.username || !req.body.password) return res.status(400).json("Missing username or password");
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) return res.status(404).json('User is incorrect!');
            const passwordValid = await bcrypt.compare(req.body.password, user.password);
            if (!passwordValid) return res.status(400).json("Invalid password");
            const { password, ...info } = user['_doc'];
            const accessToken = userController.generateAccessToken(user._id)
            return res.status(200).json({ ...info, accessToken})
        } catch (error) {
            await logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error.message);
        }
    }
}

export default userController;