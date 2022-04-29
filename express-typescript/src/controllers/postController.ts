import Post from '../models/Post';
import logEvents from '../helpers/logEvents';
const postController = {
    createPost: async (req, res) => {
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description ")
        try {
            const post = await Post.findOne({ title: req.body.title, user: req.userId });
            if (post) return res.status(400).json('Title already exist!!');
            const newPost = new Post({
                title: req.body.title,
                description: req.body.description,
                user: req.userId
            });
            await newPost.save();
            return res.status(200).json(newPost);
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getPost: async (req, res) => {
        try {
            const singlePost = await Post.findOne({_id: req.params.id, user: req.userId}).populate('user', ['username']);
            if (!singlePost) return res.status(404).json("Post not found!");
            return res.status(200).json(singlePost);
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getPostsAuth: async (req, res) => {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
            if (!posts) return res.status(404).json("Posts not found!!");
            return res.status(200).json(posts);
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find({});
            if (posts) return res.status(200).json("Posts not found!!!");
            return res.status(200).json(posts);
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    updatePostAuth: async (req, res) => {
        if (!req.body.title || !req.body.description) return res.status(400).json("Missing title or description ")
        try {
            const updatePost = await Post.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true }).populate('user', ['username']);
            if (!updatePost) return res.status(401).json("Post not found or user not authorised");
            return res.status(200).json(updatePost);
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    },
    deletePostAuth: async (req, res) => {
        try {
            const deletePost = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId });
            if (!deletePost) return res.status(401).json("Post not found or user not authorised");
            return res.status(200).json("Deleted post successfully");
        } catch (error) {
            await logEvents(error.message, module.filename);
            console.log(error.message)
            return res.status(500).json(error);
        }
    }
}

export default postController;