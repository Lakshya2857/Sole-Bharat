import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    houseNo: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
    },
    pinCode: {
        type: String,
        reuired: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        lowerCase: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        lowerCase: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: User,
    },

}, { timestamps: true })

export const Address = mongoose.model("Address", addressSchema)