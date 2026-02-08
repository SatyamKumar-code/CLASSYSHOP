import mongoose from 'mongoose';

const reviewsSchema = new mongoose.Schema({
    image: {
        type: String,
        default: '',
    },
    userName: {
        type: String,
        default: '',
    },
    review: {
        type: String,
        default: '',
    },
    rating: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }},{
    timestamps: true,
});

const ReviewModel = mongoose.model('reviews', reviewsSchema);
export default ReviewModel;

