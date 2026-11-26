import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, userName } = req.body

    console.log("Files=>", req.files);

    if (
        [fullName, email, password, userName].some((field) => field?.trim() === "")
    ) {
        throw new apiError(401, "All Fields Are Required!!!");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    })

    if (existedUser) {
        throw new apiError(400, "User Already Exists!!!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(401, "Avatar is Required!!!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    if (!avatar) {
        throw new apiError("400", "Avater Field Is Required!!!")
    }

})