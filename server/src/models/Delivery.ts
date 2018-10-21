import mongoose, { Schema } from 'mongoose';

const DeliverySchema: Schema = new Schema({
  campaign: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Campaign'
  },
  user: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Success'
  }
});
