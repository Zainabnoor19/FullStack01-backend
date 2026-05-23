import dns from 'dns'
dns.setServers(['8.8.8.8','1.1.1.1'])
import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import authroute from "./routes/AuthRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
connectDb();

// ✅ FIXED CORS - NO WILDCARD, SPECIFIC ORIGINS
// Define your allowed domains
// Replace your current app.use(cors(...)) with this cleaner alternative:
const allowedOrigins = [
  'http://localhost:5174',
  'https://full-stack01-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // If no origin (like mobile apps/curl/same-origin), allow it
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// IMPORTANT: Manually intercept and instantly resolve preflight OPTIONS requests 
// before they attempt to hit your routes.
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "successfully run" });
});

app.use('/api/v1/auth', authroute);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});