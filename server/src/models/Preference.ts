import mongoose, { Schema, Model, model, Document } from "mongoose";

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

export interface IPreference extends Document{
  contact_method: string,
  contact_type: 'email' | 'phone',
  opt_out: boolean
}

export const Preference: Model<IPreference> = model<IPreference>('Preference', PreferenceSchema);
