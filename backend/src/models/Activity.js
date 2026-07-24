import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    action: { type: String, required: true },
    category: { type: String, enum: ['auth', 'user', 'product', 'order', 'system'], default: 'system' },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String, default: '127.0.0.1' },
  },
  { timestamps: true }
);

ActivitySchema.index({ category: 1 });
ActivitySchema.index({ timestamp: -1 });

export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
