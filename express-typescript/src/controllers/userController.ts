import User from "../models/User";
import logEvents from '../helpers/logEvents';
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
    createUser: async (req, res) => {
        try {
            const user = new User({
                username: req.body.username,
                password: req.body.password,
            });
            await user.save();
            return res.status(200).json(user);
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error);
        }
    }
}

export default userController;