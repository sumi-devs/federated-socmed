import Express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { getPublicKey } from '../controllers/federationController.js';
import { verifyFederationRequest } from '../middleware/verifyFederationRequest.js';
import { federationInbox } from '../controllers/federationInboxController.js';

const router = Express.Router();

router.get("/public-key", getPublicKey);
router.post("/inbox", federationInbox);
// router.post("/inbox",verifyFederationRequest,federationInbox)

import { getFederationStatus, toggleFederationStatus } from '../controllers/federationController.js';
router.get("/status", verifyToken, verifyAdmin, getFederationStatus);
router.put("/status", verifyToken, verifyAdmin, toggleFederationStatus);

export default router;