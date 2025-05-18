import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    topic: string;
    content: string;
    imageUrl?: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;

    updatedAt: Date;
  }