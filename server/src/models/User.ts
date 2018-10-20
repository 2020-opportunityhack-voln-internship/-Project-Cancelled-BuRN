import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  phone: String,
  isOptOut: {
    type: Boolean,
    required: true,
    default: false
  },
  mostRecentMessage: {
    type: Schema.Types.ObjectId,
    ref: 'Message'  
  }
})

export const User = mongoose.model('User', UserSchema);
