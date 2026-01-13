import mongoose from 'mongoose';

const productWEIGHTchema = new mongoose.Schema({
    weight: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const ProductWEIGHTModel = mongoose.model('ProductWEIGHT', productWEIGHTchema);
export default ProductWEIGHTModel;