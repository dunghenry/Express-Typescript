import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IProduct {
    title: string,
    image: string,
    description: string,
    category: string,
    price: number,
}

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})
productSchema.index({ title: 'text', category: 'text'});

const Product = mongoose.model('Product', productSchema);
Product.createIndexes({ title: 'text', category: 'text'});
export default Product;