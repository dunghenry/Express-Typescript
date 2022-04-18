import mongoose from 'mongoose';
const Schema = mongoose.Schema;
interface IUser{
    username: string;
    password: string;
    avatar?: string;
}
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
})  
const User = mongoose.model('User', userSchema);
export default User;