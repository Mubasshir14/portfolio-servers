import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { SkillService } from './skill.service';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createSkill = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body,);
  console.log("--------------------------");
  console.log( req.file);
   console.log("--------------------------");
  console.log( req.user);
  const result = await SkillService.createSkill(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill created succesfully',
    data: result,
  });
});

const getAllSkill = catchAsync(async (req, res) => {
  const result = await SkillService.getAllSkill();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill are retrieved succesfully',
    data: result,
  });
});

const getSkillById = catchAsync(async (req, res) => {
    const { id } = req.params;
  const result = await SkillService.getSkillById(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill are retrieved succesfully',
    data: result,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SkillService.deleteSkill(id, req.user as IJwtPayload);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Skill is deleted successfully',
    data: result,
  });
});

export const SkillController = {
  createSkill,
  getAllSkill,
  getSkillById,
  deleteSkill,
};
