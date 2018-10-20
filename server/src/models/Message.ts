import mongoose, { Schema } from "mongoose";

const ResponseSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const MessageSchema: Schema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  responses: [{
    type: Response
  }]
});

export const Message = mongoose.model('Message', MessageSchema)
