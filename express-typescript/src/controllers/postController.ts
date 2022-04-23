import Post from '../models/Post';
import logEvents from '../helpers/logEvents';
const postController = {
    createPost: async (req, res) => {
        console.log(req.userId);
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description ")
        try {
            const post = new Post({
                title: req.body.title,
                description: req.body.description,
                user: req.userId
            });
            await post.save();
            return res.status(200).json(post);
        } catch (error) {
            await logEvents(error.message);
            console.log(error.message)
        }
    }
}

export default postController;