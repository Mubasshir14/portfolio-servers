import mongoose, { Schema } from 'mongoose';
import { ISkill } from './skill.interface';

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  level: { type: String },
  imageUrl: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
