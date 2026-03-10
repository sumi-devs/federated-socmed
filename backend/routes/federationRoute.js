import express from "express";
import {
    getServerConfig,
    receiveFederationMessage,
    acknowledgeFederationMessage,
} from "../controllers/federationController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public: exposes this server's identity (name + port)
// Useful for other federated servers to confirm they're on the right port
router.get("/config", getServerConfig);

// Protected: incoming federated message – returns immediate ACK
router.post("/message", verifyToken, receiveFederationMessage);

// Protected: explicit ACK after a server has processed a received message
router.post("/ack", verifyToken, acknowledgeFederationMessage);

export default router;
