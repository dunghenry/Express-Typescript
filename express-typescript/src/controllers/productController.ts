import Product from '../models/Product';
import logEvents from '../helpers/logEvents';
import { APIfeatures } from '../lib/features';
const productController = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Product.find({}), req.query)
                .panigating().sorting().searching().filtering();

            // const page = req.query.page * 1 || 1;
            // const limit = req.query.limit * 1 || 5;
            // const skip = limit * (page - 1);
            // const sort = req.query.sort || '-createdAt';
            // const products = await Product.find({}).limit(limit).skip(skip).sort(sort);

            const result = await Promise.allSettled([
                features.query,
                Product.countDocuments()
            ])
            // const products = await features.query
            const products = result[0].status === 'fulfilled' ? result[0].value : [];
            const count = result[1].status === 'fulfilled' ? result[1].value : 0;
            const limit = Number(req.query.limit);
            const data = await Product.find({});
            const length = data.length
            const page = length / limit
            return res.status(200).json({ products, count, page });
        } catch (error) {
            logEvents(error.message);
            return res.status(500).json(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findById(id);
            if (!product) return res.status(404).json("This product does not exist");
            return res.status(200).json(product);
        } catch (error) {
            logEvents(error.message);
            return res.status(500).json(error)
        }
    },
    addProduct: async (req, res) => {
        try {
            const product = new Product({
                title: req.body.title,
                image: req.body.image,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price
            });
            await product.save();
            return res.status(200).json(product);
        } catch (error) {
            logEvents(error.message);
            return res.status(500).json(error)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, image, description, category, price } = req.body;
            const product = await Product.findByIdAndUpdate(id, { title, image, description, category, price }, { new: true })
            if (!product) return res.status(404).json("This product does not exist");
            return res.status(200).json(product);
        } catch (error) {
            logEvents(error.message);
            return res.status(500).json(error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await Product.findByIdAndDelete(id);
            if (!product) return res.status(404).json("This product does not exist");
            return res.status(200).json({message: "Deleted product successfully!!!"});
        } catch (error) {
            logEvents(error.message);
            return res.status(500).json(error)
        }
    }
}

export default productController;