import express from 'express';
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { createReport, getAllReports, getReportById, updateReportStatus } from '../controllers/reportController.js';

const router = express.Router();

router.post("/", verifyToken, createReport);
//optional router.get("/:federatedId", verifyToken, getMyReports);
router.get("/", verifyAdmin, verifyToken, getAllReports);
router.get("/:reportId", verifyAdmin, verifyToken, getReportById);
router.put("/:reportId/status", verifyAdmin, verifyToken, updateReportStatus);


export default router;