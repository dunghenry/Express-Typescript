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
            await logEvents(error.message, module.filename);
            return res.status(500).json(error);
        }
    },
    generateAccessToken: (userId) => {
        return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
    },
    generateRefreshToken: (userId) => {
        return jwt.sign({ userId: userId }, process.env.REFESH_TOKEN_SECRET, { expiresIn: '365d' })
    },
    createUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                password: hashed
            });
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            await logEvents(error.message, module.filename);
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
            if (user && passwordValid) {
                const accessToken = userController.generateAccessToken(user._id);
                const refreshToken = userController.generateRefreshToken(user._id);
                const { password, ...info } = user['_doc'];

                //save refreshToken to cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                return res.status(200).json({ ...info, accessToken })
            }
            
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refreshToken");
            return res.status(200).json("Logged out successfully");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    deleteAccount: async (req, res) => {
        try {
            const validId = (req.params.id === req.userId);
            console.log(validId);
            const account = await User.findOneAndDelete({ _id: req.userId, validId});
            if (!account) return res.status(401).json("User not found or user not authorised!!!");
            return res.status(200).json("Deleted account successfully!!!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    }
}

export default userController;