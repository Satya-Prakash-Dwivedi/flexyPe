import mongoose from 'mongoose';

const FailedRequestSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  timestamp: { type: Date, required: true },
  reason: { type: String, required: true },
});

export default mongoose.model('FailedRequest', FailedRequestSchema);