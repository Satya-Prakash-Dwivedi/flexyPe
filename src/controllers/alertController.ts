`alertcontroller`
import { Request, Response } from 'express';
import FailedRequest from '../models/FailedRequest';

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await FailedRequest.find();
    const formattedMetrics = metrics.map(metric => ({
      ...metric.toObject(),
      timestamp: new Date(metric.timestamp).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }));
    res.status(200).json(formattedMetrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching metrics', error });
  }
};