import mongoose from 'mongoose';

const productSIZEchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const ProductSIZESModel = mongoose.model('ProductSIZE', productSIZEchema);
export default ProductSIZESModel;