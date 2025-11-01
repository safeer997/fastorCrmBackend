import mongoose, { Schema } from 'mongoose';

const leadSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    courseInterest: {
      type: String,
    },
    claimedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    claimedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
