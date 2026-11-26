import mongoose from "mongoose"

const cartSchema = mongoose.Schema({
    product: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product"
        }
    ],
    quantity: {
        type: Number,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    owner: {
        required: true,
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["active", "removed"],
        default: "active"
    },
    avatar: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },



}, { timestamps: true })

export const Cart = mongoose.model("Cart", cartSchema)