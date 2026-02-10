import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

const MONGO_URL =
  "mongodb+srv://altonallan47_db_user:CbuZJM2O5XwLBjRx@null.23jy8pp.mongodb.net/?appName=NULL";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
  console.log("✅ Successfully connected to MongoDB Atlas!");
});

mongoose.connection.on("error", (error: Error) => {
  console.error("❌ MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected!");
});

mongoose.connect(MONGO_URL).catch((err) => {
  console.error("🔥 Initial Connection Failed:", err.message);
});
