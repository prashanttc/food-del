// src/app.ts or your main server file
import Express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./routes/UserRoutes";

const allowedOrigins = [
  'http://localhost:5173',
  'https://easyeats-w0i8.onrender.com',
  // Add more origins as needed
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log("Connected to the database"))
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the application if unable to connect to the database
  });

const app = Express();

// CORS Configuration
const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS denied for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true, // Allow cookies and other credentials
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// Handle Preflight Requests for All Routes
app.options('*', cors(corsOptions));

// Middleware to parse JSON
app.use(Express.json());

// Health Check Route
app.get("/health", async (req: Request, res: Response) => {
  res.json({ message: "health OK!!" });
});

// User Routes
app.use("/api/my/user", UserRoutes);

// Error Handling Middleware for CORS Errors
app.use((err: Error, req: Request, res: Response, next: Function) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'CORS Error: Access Denied' });
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
