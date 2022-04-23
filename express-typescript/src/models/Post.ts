import mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface IPost {
    title: string
    description: string,
    user: typeof mongoose.Types.ObjectId
}
const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})
const Post = mongoose.model('Post', postSchema);

export default Post;