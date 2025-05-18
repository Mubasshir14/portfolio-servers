/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser, Role } from './user.interface';
import AppError from '../../app/errors/appError';
import { StatusCodes } from 'http-status-codes';
import { User } from './user.model';
import { IImageFile } from '../../app/interface/IImageFile';
import jwt from 'jsonwebtoken';
import config from '../../app/config';

const registerUser = async (userData: IUser) => {
  if ([Role.ADMIN].includes(userData.role)) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Invalid role. Only User is allowed.',
    );
  }

  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      'Email is already registered',
    );
  }

  const createdUser = await User.create(userData);

  const accessToken = jwt.sign(
    { id: createdUser._id, role: createdUser.role },
    config.jwt_access_secret as string,
    { expiresIn: config.jwt_access_expires_in as any },
  );

  const refreshToken = jwt.sign(
    { id: createdUser._id, role: createdUser.role },
    config.jwt_refresh_secret as string,
    { expiresIn: config.jwt_refresh_expires_in as any },
  );

  return {
    createdUser,
    accessToken,
    refreshToken,
  };
};

const getAllUser = async () => {
  const result = await User.find();
  return result;
};

const myProfile = async (authUser: any) => {
  const isUserExists = await User.findById(authUser.userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
  }

  const profile = await User.findOne({ user: isUserExists._id });

  return {
    ...isUserExists.toObject(),
    profile: profile || null,
  };
};

const updateProfile = async (payload: any, file: IImageFile, authUser: any) => {
  const isUserExists = await User.findById(authUser.userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is not active!');
  }

  if (file && file.path) {
    payload.photo = file.path;
  }

  const result = await User.findOneAndUpdate(
    { user: authUser.userId },
    payload,
    {
      new: true,
    },
  ).populate('User');

  return result;
};

const updateUserStatus = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found');
  }

  user.isActive = !user.isActive;
  const updatedUser = await user.save();
  return updatedUser;
};

export const UserServices = {
  registerUser,
  getAllUser,
  myProfile,
  updateProfile,
  updateUserStatus,
};
