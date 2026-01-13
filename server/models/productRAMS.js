import mongoose from 'mongoose';

const productRAMSSchema = new mongoose.Schema({
    Ram: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const ProductRAMSModel = mongoose.model('ProductRAMS', productRAMSSchema);

export default ProductRAMSModel;