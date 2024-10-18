import  Express,{Request,Response}  from "express";
import  cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import MyUserRoutes from "./routes/MyUserRoutes";
import { v2 as cloudinary} from "cloudinary"
import MyRestaurantRoutes from "./routes/MyRestaurantRoutes";
import OrderRoutes from "./routes/OrderRoutes";
import RestaurantRoutes from "./routes/RestaurantRoutes";

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log("connected to the database"))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const app =Express()
app.use(cors())
app.use("/api/order/checkout/webhook",Express.raw({type:"*/*"}))
app.use(Express.json())
app.get("/health", async(req: Request, res: Response)=>{
res.json({message:"health OK!!"})
})

app.use("/api/my/user", MyUserRoutes )
app.use("/api/my/restaurant", MyRestaurantRoutes)
app.use("/api/restaurant", RestaurantRoutes)
app.use("/api/order", OrderRoutes)

app.listen(8000,()=>{
    console.log("server is running on port: 8000")
})