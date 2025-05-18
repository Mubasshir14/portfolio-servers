import mongoose from "mongoose";

export interface IProject extends Document {
    title: string;
    description?: string;
    imageUrl?: string;
    liveUrl?: string;
    repoFrontUrl?: string;
    skills?: mongoose.Types.ObjectId[];
    repoBackUrl?: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
  