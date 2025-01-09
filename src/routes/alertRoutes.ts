import express from 'express';
import { validateHeaders } from '../middleware/authMiddleware';
import { getMetrics } from '../controllers/alertController';

const router = express.Router();

router.post('/submit', validateHeaders, (req, res) => {
  res.status(200).json({ message: 'Request submitted successfully' });
});

router.get('/metrics', getMetrics);

export default router;
