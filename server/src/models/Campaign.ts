import mongoose, { Schema } from "mongoose";
import uuid from 'uuid';
const ResponseSchema: Schema = new Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const MessageSchema: Schema = new Schema({
  uuid: {
    type: String,
    required: true,
    default: uuid()
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  responses: [{
    type: ResponseSchema
  }],
  status: {
    type: String,
    default: 'pending',
    required: true,
    enum: ['pending', 'started', 'complete']
  }
});

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  phone: String
})

const CampaignSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{
    type: MessageSchema
  }],
  users: [{
    type: UserSchema
  }],
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  complete: {
    type: Boolean,
    required: true,
    default: false
  }
});

export const Campaign = mongoose.model('Campaign', CampaignSchema)
