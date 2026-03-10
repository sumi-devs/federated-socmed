import { createError } from "../utils/error.js";

/**
 * GET /api/federation/config
 * Public endpoint – returns this server's identity (name + port).
 * Other federated servers use this to confirm they're talking to the right server.
 */
export const getServerConfig = (req, res) => {
    const port = parseInt(process.env.PORT, 10) || 5000;
    const serverName = process.env.SERVER_NAME || "unknown";
    res.status(200).json({
        success: true,
        serverName,
        port,
    });
};

/**
 * POST /api/federation/message
 * Receives an incoming federated message from another server.
 * Validates the payload and immediately returns an acknowledgment.
 *
 * Expected body: { messageId, from, content, [metadata] }
 */
export const receiveFederationMessage = async (req, res, next) => {
    try {
        const { messageId, from, content } = req.body;

        if (!messageId || !from || !content) {
            return next(
                createError(
                    400,
                    "Missing required fields: messageId, from, and content are required"
                )
            );
        }

        // In a production system you'd persist this to the DB.
        // For now we log it and return an immediate ACK so the sending server
        // knows the message was successfully received.
        console.log(
            `[Federation] Message received — id:${messageId} from:${from}`
        );

        const ack = {
            messageId,
            status: "received",
            receivedBy: process.env.SERVER_NAME,
            timestamp: new Date().toISOString(),
        };

        res.status(200).json({ success: true, ack });
    } catch (err) {
        next(err);
    }
};

/**
 * POST /api/federation/ack
 * Explicit acknowledgment endpoint.
 * A server sends this after it has processed a previously received message.
 *
 * Expected body: { messageId }
 */
export const acknowledgeFederationMessage = async (req, res, next) => {
    try {
        const { messageId } = req.body;

        if (!messageId) {
            return next(createError(400, "messageId is required"));
        }

        console.log(`[Federation] ACK confirmed — id:${messageId}`);

        const ack = {
            messageId,
            status: "acknowledged",
            acknowledgedBy: process.env.SERVER_NAME,
            timestamp: new Date().toISOString(),
        };

        res.status(200).json({ success: true, ack });
    } catch (err) {
        next(err);
    }
};
