import mongoose, {Document } from 'mongoose';
import { IUser } from '../User/user.interface';

export interface ISkill extends Document {
  name: string;
  level?: string;
  imageUrl?: string;
  users: mongoose.Types.Array<IUser>;
  createdAt: Date;
  updatedAt: Date;
}