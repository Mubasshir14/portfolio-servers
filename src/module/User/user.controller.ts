import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { UserServices } from './user.service';
import config from '../../app/config';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../app/interface/IImageFile';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registration completed successfully!',
    data: {
      // result,
      accessToken,
    },
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users are retrieved successfully',
    data: result,
  });
});

const myProfile = catchAsync(async (req, res) => {
  const result = await UserServices.myProfile(req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfile(
    req.body,
    req.file as IImageFile,
    req.user,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Profile updated successfully`,
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const result = await UserServices.updateUserStatus(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `User is now ${result.isActive ? 'active' : 'inactive'}`,
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUser,
  myProfile,
  updateUserStatus,
  updateProfile,
};
