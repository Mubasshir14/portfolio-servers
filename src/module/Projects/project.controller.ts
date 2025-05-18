import { StatusCodes } from 'http-status-codes';
import { IImageFile } from '../../app/interface/IImageFile';
import sendResponse from '../../app/utils/sendResponse';
import { IJwtPayload } from '../Auth/auth.interface';
import { ProjectService } from './project.service';
import catchAsync from '../../app/utils/catchAsync';
import { Request, Response } from 'express';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.createProject(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project created succesfully',
    data: result,
  });
});

const getAllProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getAllProject();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched succesfully',
    data: result,
  });
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ProjectService.getProjectById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project fetched succesfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.updateProject(
    id,
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project is updated succesfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProjectService.deleteProject(
    id,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Project is deleted succesfully',
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
};
