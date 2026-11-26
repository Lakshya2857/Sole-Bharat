import mongoose from "mongoose";
import { User } from "./user.model";

const wishListSchema = new mongoose.Schema({
    product: {
        type: String,
    },
    avatar: {
        type: Mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: User,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
}

    , { timestamps: true })

export const WishList = mongoose.model("WishList", wishListSchema)