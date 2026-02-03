import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";
import { createChannel, deleteChannel, getAllChannels, getChannel, updateChannelDescription, updateChannelImage, updateChannelRules } from "../controllers/channelController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

// Actions on channels by Admin only

router.post("/",verifyToken,verifyAdmin,createChannel);
router.delete("/:id",verifyToken,verifyAdmin,deleteChannel);
router.put("/description/:channelName",verifyToken,verifyAdmin,updateChannelDescription);
router.put("/rules/:channelName",verifyToken,verifyAdmin,updateChannelRules);
router.put("/image/:channelName",verifyToken,verifyAdmin,updateChannelImage);
router.get("/",verifyToken,getAllChannels);
router.get("/:channelName",verifyToken,getChannel);
// router.get("/followers/:channelName");

//User actions on channels

// router.post("/follow/:channelName");
// router.delete("/unfollow/:channelName");
// router.get("/follow/:channelName");


export default router;