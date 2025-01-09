import { Request, Response } from 'express';
import FailedRequest from '../models/FailedRequest';

export const getMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await FailedRequest.find();
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching metrics', error });
  }
};