import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { createChannel, deleteChannel, getAllChannels, updateChannelDescription, updateChannelRules } from "../controllers/channelController.js";

const router = express.Router();
// router.get("/",verifyToken,getAllChannels);

router.post("/",verifyToken,createChannel);
router.delete("/:id",verifyToken,deleteChannel);
// router.put("serverDescription/:id",verifyToken,updateChannelDescription);
// router.put("serverRules/:id",verifyToken,updateChannelRules);

export default router;