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

DeliverySchema.query.getMostRecent = function(user_identifier: string): Promise<{campaign: string, user: string, message: string, date: Date, status: string}> {
  return this.findOne({user: user_identifier}).sort({date: -1}).limit(1);
}

export const Delivery = mongoose.model('Delivery', DeliverySchema);
