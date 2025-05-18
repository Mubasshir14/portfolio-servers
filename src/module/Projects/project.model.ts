import mongoose, { Schema } from 'mongoose';
import { IProject } from './project.interface';

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    liveUrl: { type: String },
    repoFrontUrl: { type: String },
    repoBackUrl: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
