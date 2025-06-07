import express from 'express';
import { createPaymentLink } from '../controllers/squareController.js';

const router = express.Router();

router.post('/create-payment', createPaymentLink);

export default router;
