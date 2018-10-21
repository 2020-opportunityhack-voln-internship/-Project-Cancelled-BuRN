import mongoose, { Schema } from "mongoose";

const PreferenceSchema: Schema = new Schema({
  contact_method: {
    type: String,
    required: true,
    unique: true
  },
  contact_type: {
    type: String,
    required: true
  },
  opt_out: {
    type: Boolean,
    required: true,
    default: false
  }
});

export const Preference = mongoose.model('Preference', PreferenceSchema)
