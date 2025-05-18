import { StatusCodes } from 'http-status-codes';
import { IBlog } from './blog.interface';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import { Blog } from './blog.model';
import AppError from '../../app/errors/appError';
import { Role } from '../User/user.interface';

const createBlog = async (
  dataata: Partial<IBlog>,
  icon: IImageFile,
  authUser: IJwtPayload,
) => {
  const blog = new Blog({
    ...dataata,
    userId: authUser.userId,
    imageUrl: icon?.path,
  });

  const result = await blog.save();

  return result;
};

const getAllBlog = async () => {
  const result = await Blog.find();
  return result;
};

const getBlogById = async (id: string) => {
  const result = await Blog.findOne({ _id: id });
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
  file: IImageFile,
  authUser: IJwtPayload,
) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found!');
  }

  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to edit the Blog!',
    );
  }

  if (file && file.path) {
    payload.imageUrl = file.path;
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteBlog = async (id: string, authUser: IJwtPayload) => {
  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Blog!',
    );
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
