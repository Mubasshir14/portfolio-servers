import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { BlogService } from './blog.service';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlog(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created succesfully',
    data: result,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlog();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog are retrieved succesfully',
    data: result,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getBlogById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog are retrieved succesfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.updateBlog(
    id,
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is updated succesfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.deleteBlog(id, req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog is deleted successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
