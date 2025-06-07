import express from "express";
import { squareWebhookHandler } from "../controllers/webhookController.js";

const router = express.Router();

router.post("/square", express.json({ type: "*/*" }), squareWebhookHandler);

export default router;
