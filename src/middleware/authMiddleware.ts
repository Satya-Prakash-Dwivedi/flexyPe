import { Request, Response, NextFunction } from 'express';
import FailedRequest from '../models/FailedRequest';
import { sendAlertEmail } from '../services/emailService';

const THRESHOLD = 5;
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes

export const validateHeaders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { authorization } = req.headers;
    const reqTimestamp = Date.now();
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip === '::1') {
      ip = '127.0.0.1';
    }

    // Check if the IP has failed requests in the last 10 minutes
    const recentFailedRequests = await FailedRequest.find({
      ip,
      timestamp: { $gte: new Date(reqTimestamp - TIME_WINDOW) },
    });

    if (recentFailedRequests.length >= THRESHOLD) {
      const latestReason = recentFailedRequests[recentFailedRequests.length - 1]?.reason || 'Unknown reason';
      await sendAlertEmail(ip as string, recentFailedRequests.length, latestReason);

    }

    if (!authorization) {
      await FailedRequest.create({
        ip,
        timestamp: reqTimestamp,
        reason: 'Invalid header, no authorization found',
      });
     res.status(400).json({ message: 'Invalid header, no authorization found' });
     return
    }

    if (authorization !== process.env.ACCESS_TOKEN) {
      await FailedRequest.create({
        ip,
        timestamp: reqTimestamp,
        reason: 'Invalid access token',
      });
     res.status(401).json({ message: 'Invalid access token' });
     return
    }

    next();
  } catch (error) {
    console.error('Error in validateHeaders middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};