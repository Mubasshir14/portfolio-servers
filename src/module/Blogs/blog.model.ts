import mongoose, { Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
