import mongoose, { Schema } from 'mongoose';
import { IUser, Role } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';
import AppError from '../../app/errors/appError';
import { StatusCodes } from 'http-status-codes';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: { type: String },
    avatarUrl: { type: String },
    role: {
      type: String,
      enum: [Role.USER, Role.ADMIN],
      default: Role.USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },    
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
    skills: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Skill',
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    certificates: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Certificate',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
});


UserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
     delete ret.password;
     return ret;
  },
});

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

UserSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);

  if (!existingUser) {
     throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User does not exist!');
  }

  if (!existingUser.isActive) {
     throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'User is not active!');
  }

  return existingUser;
};


export const User = mongoose.model<IUser>('User', UserSchema);
