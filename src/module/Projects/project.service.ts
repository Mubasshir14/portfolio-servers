/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/appError';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import { Project } from './project.model';
import { Role } from '../User/user.interface';

const createProject = async (
  data: any,
  icon: IImageFile,
  authUser: IJwtPayload,
) => {
  try {
    const project = new Project({
      ...data,
      userId: authUser.userId,
      imageUrl: icon?.path,
    });
    await project.save();
    return project;
  } catch (error) {
    throw new Error(`Error while creating project ${error}`);
  }
};

const getAllProject = async () => {
  const result = await Project.find().populate('skills');
  return result;
};

const getProjectById = async (id: string) => {
  const result = await Project.findById({ _id: id }).populate('skills');
  return result;
};

const updateProject = async (
  id: string,
  payload: any,
  file: IImageFile,
  authUser: IJwtPayload,
) => {
  const isProjectExist = await Project.findById(id);
  if (!isProjectExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Project not found!');
  }

  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to edit the Project!',
    );
  }

  if (file && file.path) {
    payload.imageUrl = file.path;
  }

  const result = await Project.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteProject = async (id: string, authUser: IJwtPayload) => {
  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Category!',
    );
  }

  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectService = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
