import app from "./app";
import dotenv from "dotenv"
import connectDB from "./src/db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER IS HOSTED ON PORT ${process.env.PORT}`)
        })
    })

    .catch((err) => { console.log("error In Hosting", err) })