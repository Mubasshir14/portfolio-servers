import mongoose, { Document } from 'mongoose';

export interface IContact extends Document {
  subject: string;
  message: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}