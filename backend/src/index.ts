import  Express,{Request,Response}  from "express";
import  cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";

mongoose.connect(process.env.MONGO_URL as string).then(()=>console.log("connected to the database"))

const allowedOrigins = ["http://localhost:5173"]

const app =Express()
app.use(Express.json())
app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE',// If you need to send cookies or other credentials
  }));

app.get("/health", async(req: Request, res: Response)=>{
res.json({message:"health OK!!"})
})

app.use("/api/my/user", UserRoutes)

app.listen(8000,()=>{
    console.log("server is running on port: 8000")
})