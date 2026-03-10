import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoute.js"
import postRoute from "./routes/postRoute.js"
import channelRoute from "./routes/channelRoute.js"
import userRoute from "./routes/userRoute.js"
import reportRoute from "./routes/reportRoute.js"
import serverRoute from "./routes/serverRoute.js"
import federationRoute from "./routes/federationRoute.js"

dotenv.config()

const app = express()

const PORT = parseInt(process.env.PORT, 10) || 5000;

// Derive server identity from port number.
// Each physical server instance is identified by its port:
//   5000 → food server
//   5001 → sports server
// This way changing one server's port never affects the other.
const PORT_TO_SERVER = {
  5000: "food",
  5001: "sports",
};
if (PORT_TO_SERVER[PORT]) {
  process.env.SERVER_NAME = PORT_TO_SERVER[PORT];
  console.log(`[Identity] Server name derived from port ${PORT}: "${process.env.SERVER_NAME}"`);
} else if (!process.env.SERVER_NAME) {
  process.env.SERVER_NAME = "unknown";
  console.warn(`[Identity] Unknown port ${PORT} – SERVER_NAME not set in .env, defaulting to "unknown"`);
}

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB")
}).catch((err) => {
  console.log("Error connecting to MongoDB:", err)
})

app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)
app.use("/api/user", userRoute)
app.use("/api/channels", channelRoute)
app.use("/api/reports", reportRoute)
app.use("/api/servers", serverRoute)
app.use("/api/federation", federationRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!!"
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} as "${process.env.SERVER_NAME}" server`)
})

export default app