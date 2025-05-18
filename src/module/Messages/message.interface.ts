import mongoose, { Document } from 'mongoose';

export interface IMessage extends Document {
  subject?: string;
  message: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}