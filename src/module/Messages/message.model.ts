import mongoose, { Schema } from 'mongoose';
import { IMessage } from './message.interface';

const MessageSchema = new Schema<IMessage>({
  subject: { type: String },
  message: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
