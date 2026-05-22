import dns from 'dns'
dns.setServers(['8.8.8.8','1.1.1.1'])

import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authroute from "./routes/AuthRoutes.js";
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import blogroute from "./routes/BlogRoute.js";  // YEH HATANA HAI

const app = express();

dotenv.config();
connectDb();

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.json({
    message: "successfully run",
  });
});

// Sirf auth routes rakho
app.use('/api/v1/auth', authroute)
// app.use('/api/v1/blog/', blogroute)  // YEH BHI HATANA HAI

app.listen(process.env.PORT, () => {
  console.log("server is running", process.env.PORT);
});