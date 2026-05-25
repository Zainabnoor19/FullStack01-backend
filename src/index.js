import dns from 'dns';
dns.setServers(['8.8.8.8','1.1.1.1']);
import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authroute from "./routes/AuthRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// Connect to Database
connectDb();

const allowedOrigins = [
  'http://localhost:5173',
  'https://full-stack01-frontend.vercel.app/'
 
];

app.use(cors({
  origin:allowedOrigins,
  credentials:true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "successfully run" });
});

app.use('/api/v1/auth', authroute);

const PORT = process.env.PORT || 7000;
if(process.env.DEP == 'local'){
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
}

export default app
