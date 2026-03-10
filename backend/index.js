import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import dns from "dns"

// dns.setServers(['8.8.8.8', '1.1.1.1'])
// dns.setDefaultResultOrder("ipv4first")


import authRoute from "./routes/authRoute.js"
import postRoute from "./routes/postRoute.js"
import channelRoute from "./routes/channelRoute.js"
import userRoute from "./routes/userRoute.js"
import reportRoute from "./routes/reportRoute.js"
import federationRout from "./routes/federationRoute.js"
import serverRoute from "./routes/serverRoute.js"
import activityRoute from "./routes/activityRoute.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())

// Debug incoming requests for CORS
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.url} - Origin: ${req.headers.origin || 'No Origin'}`);
  next();
});


app.get("/ping", (req, res) => res.json({ status: "alive", time: new Date().toISOString() }));
app.get("/api/health", (req, res) => res.json({
  status: "ok",
  db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  port: PORT,
  server: process.env.SERVER_NAME
}));


console.log("Starting connection to:", process.env.MONGO_URL?.split("@")[1] || "No URL found")
mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 5000
}).then(() => {

  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err)
})



// Keep-alive to prevent process from exiting prematurely
const keepAlive = setInterval(() => {
  if (mongoose.connection.readyState === 1) {
    // console.log("DB still connected...");
  }
}, 30000);


app.use("/api/auth", authRoute)

app.use("/api/posts", postRoute)
app.use("/api/user", userRoute)
app.use("/api/channels", channelRoute)
app.use("/api/reports", reportRoute)
app.use("/api/federation", federationRout)
app.use("/api/servers", serverRoute)
app.use("/api/activities", activityRoute)
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

const startServer = () => {
  // Listen on all addresses explicitly
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] Success: Listening on http://0.0.0.0:${PORT}`);
  });

  server.on('error', (err) => {
    console.error("[SERVER] Error starting on port:", PORT, err.message);
  });
};

startServer();


// Global Error Handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('[PROCESS] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[PROCESS] Uncaught Exception:', err);
});

console.log(`[BACKEND] Initializing at ${new Date().toISOString()}`);
console.log(`[BACKEND] Mode: ${process.env.NODE_ENV || 'development'}`);

export default app

