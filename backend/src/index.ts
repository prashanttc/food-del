import  Express,{Request,Response}  from "express";
import  cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log("connected to the database"))


const app =Express()
app.use(cors())
app.use(Express.json())


app.get("/health", async(req: Request, res: Response)=>{
res.json({message:"health OK!!"})
})

app.use("/api/my/user", UserRoutes)

app.listen(8000,()=>{
    console.log("server is running on port: 8000")
})