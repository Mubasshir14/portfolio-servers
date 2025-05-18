/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { IProject } from '../Projects/project.interface';
import { ISkill } from '../Skills/skill.interface';
import { IBlog } from '../Blogs/blog.interface';
import { ICertificate } from '../Certificates/certificate.interface';
import { IMessage } from '../Messages/message.interface';
import { IContact } from '../Contacts/contact.interface';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
  role: Role;
  isActive: boolean;
  projects: mongoose.Types.Array<IProject>;
  skills: mongoose.Types.Array<ISkill>;
  blogs: mongoose.Types.Array<IBlog>;
  certificates: mongoose.Types.Array<ICertificate>;
  messages: mongoose.Types.Array<IMessage>;
  contacts: mongoose.Types.Array<IContact>;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
