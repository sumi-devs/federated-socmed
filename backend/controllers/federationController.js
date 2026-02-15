import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createError } from "../utils/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPublicKey = (req, res) => {
  try {
    const publicKeyPath = path.join(__dirname, "../keys/public.pem");

    if (!fs.existsSync(publicKeyPath)) {
      return res.status(500).json({
        message: "Public key not found"
      });
    }

    const publicKey = fs.readFileSync(publicKeyPath, "utf8");

    res.status(200).json({
      serverName: process.env.SERVER_NAME,
      serverUrl: process.env.SERVER_URL,
      algorithm: "RSA-SHA256",
      publicKey
    });

  } catch (error) {
    next(createError(500, "Failed to retrieve public key"));
  }
};