import  Express,{Request,Response}  from "express";
import  cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";
import { v2 as cloudinary} from "cloudinary"
import RestaurantRoutes from "./routes/RestaurantRoutes";

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log("connected to the database"))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const app =Express()
app.use(cors())
app.use(Express.json())


app.get("/health", async(req: Request, res: Response)=>{
res.json({message:"health OK!!"})
})

app.use("/api/my/user", UserRoutes)
app.use("/api/my/restaurant", RestaurantRoutes)

app.listen(8000,()=>{
    console.log("server is running on port: 8000")
})