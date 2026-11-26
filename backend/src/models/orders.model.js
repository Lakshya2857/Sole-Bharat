import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        default: "upi"
    },
    transactionId: {
        type: String,
        required: true,

    },


}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema);