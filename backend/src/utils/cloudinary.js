import { v2 as cloudinary } from "cloudinary"
import bcrypt from "bcrypt";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null
        else {
            const response = await uploader.upload(localfilepath, {
                resource_type: "auto"
            })

        }
        console.log("the file is uploaded on cloudinary", response.url)
        return response
        fs.unlinkSync(localfilepath)

    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null
    }
}

export default uploadOnCloudinary;