import mongoose, { Schema } from 'mongoose';
import { IContact } from './contact.interface';

const ContactSchema = new Schema<IContact>({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model<IContact>('Contact', ContactSchema);
