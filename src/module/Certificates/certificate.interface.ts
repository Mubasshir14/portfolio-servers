import mongoose, { Document } from 'mongoose';

export interface ICertificate extends Document {
  title: string;
  issuer?: string;
  imageUrl?: string;
  skills: mongoose.Types.ObjectId[]; 
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
