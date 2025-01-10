import { Request, Response, NextFunction } from 'express';
import FailedRequest from '../models/FailedRequest';
import { sendAlertEmail } from '../services/emailService';
import { json } from 'stream/consumers';

const failedRequests: Record<string, { count: number; firstAttempt: number }> = {};
const THRESHOLD = 5;
const TIME_WINDOW = 10 * 60 * 1000; // 10 minutes

export const validateHeaders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { authorization } = req.headers;
    if (!authorization){
      console.log("Invalid header, no authorization found")
      res.status(400).json({ message : "Invalid header, no authorization found"})
    }
    else {
      console.log(`Headers ${JSON.stringify(req.headers)}`)
    const ip = req.socket.remoteAddress || 'unknown'; // Fallback for undefined IP
    console.log(`IP address ${ip}`)
    const currentTime = Date.now();

    if (authorization !== process.env.ACCESS_TOKEN) {
      if (!failedRequests[ip]) {
        failedRequests[ip] = { count: 1, firstAttempt: currentTime };
      } else {
        failedRequests[ip].count++;
        if (currentTime - failedRequests[ip].firstAttempt > TIME_WINDOW) {
          failedRequests[ip] = { count: 1, firstAttempt: currentTime };
        }
      }

      if (failedRequests[ip].count > THRESHOLD) {
        await sendAlertEmail(ip, failedRequests[ip].count);
      }

      await FailedRequest.create({
        ip,
        timestamp: new Date(),
        reason: 'Invalid access token',
      });

      res.status(401).json({ message: 'Invalid access token' });
      return; // Explicitly return after sending a response
    }

    next();
    }
    
  } catch (error) {
    console.error('Error in validateHeaders middleware:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
