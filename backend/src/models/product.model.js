import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    brand: {
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
    },

    discountPrice: {
        type: Number
    },

    images: [{
        type: String
    }],

    sizes: [{
        type: Number
    }],

    colors: [{
        type: String
    }],

    stock: {
        type: Number,
        default: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);