import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
    },
    oldPrice: {
        type: Number,
        default: 0,
    },
    catName: {
        type: String,
        default: ""
    },
    catId: {
        type: String,
        default: ""
    },
    subCatId: {
        type: String,
        default: ""
    },
    subCat: {
        type: String,
        default: ""
    },
    thirdsubCat: {
        type: String,
        default: ""
    },
    thirdsubCatId: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }, 
    countInStock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    discount: {
        type: Number,
        required: true
    },
    sale: {
        type: Number,
        default: 0
    },
    productRam: [
        {
            type: String,
            default: null,
        }
    ],
    size: [
        {
            type: String,
            default: null,
        }
    ],
    productWeight: [
        {
            type: String,
            default: null
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    bannerImage: [
        {
            type: String,
            default: null
        }
    ],
    bannerTitlename: {
        type: String,
        default: null
    },
    isDisplayOnHomeBanner: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

// TEXT SEARCH
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  catName: "text",
  subCat: "text",
  thirdsubCat: "text"
});

// CATEGORY FILTER
productSchema.index({ catId: 1 });
productSchema.index({ subCatId: 1 });
productSchema.index({ thirdsubCatId: 1 });

// PRICE
productSchema.index({ price: 1 });

// RATING
productSchema.index({ rating: -1 });

// LATEST
productSchema.index({ createdAt: -1 });

// FEATURED
productSchema.index({ isFeatured: 1 });

// ADVANCED FILTER
productSchema.index({
  catId: 1,
  price: 1,
  rating: -1
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;