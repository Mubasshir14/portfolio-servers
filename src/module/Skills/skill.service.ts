import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/appError';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import { ISkill } from './skill.interface';
import { Skill } from './skill.model';
import { Role } from '../User/user.interface';
import { Project } from '../Projects/project.model';

const createSkill = async (
  data: Partial<ISkill>,
  icon: IImageFile,
  authUser: IJwtPayload,
) => {
  console.log("line 15", data);
  const skill = new Skill({
    ...data,
    userId: authUser.userId,
    imageUrl: icon?.path,
  });

  const result = await skill.save();
  console.log(result);
  return result;
};

const getAllSkill = async () => {
  const result = await Skill.find();
  return result;
};

const getSkillById = async (id: string) => {
  const result = await Skill.findOne({ id });
  return result;
};

const deleteSkill = async (id: string, authUser: IJwtPayload) => {
  const isSKillExist = await Skill.findById(id);
  if (!isSKillExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Skill not found!');
  }

  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Skill!',
    );
  }

  const project = await Project.findOne({ skills: id });
  if (project)
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You can not delete the skill. Because the skill is related to projects.',
    );

  const res = await Skill.findByIdAndDelete(id);
  return res;
};

export const SkillService = {
  createSkill,
  getAllSkill,
  getSkillById,
  deleteSkill,
};
