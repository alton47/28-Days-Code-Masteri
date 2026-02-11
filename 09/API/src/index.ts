import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

require("dotenv").config();

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
  console.log(`🚀 Server is running ..`);
});

const MONGO_URL = process.env.MONGO_URL;

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

app.use("/", router());
