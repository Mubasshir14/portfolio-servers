import { StatusCodes } from 'http-status-codes';
import { ICertificate } from './certificate.interface';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import AppError from '../../app/errors/appError';
import { Role } from '../User/user.interface';
import { Certificate } from './certificate.model';

const createCertificate = async (
  data: Partial<ICertificate>,
  icon: IImageFile,
  authUser: IJwtPayload,
) => {
  const cer = new Certificate({
    ...data,
    userId: authUser.userId,
    imageUrl: icon?.path,
  });

  const result = await cer.save();

  return result;
};

const getCertificate = async () => {
  const result = await Certificate.find();
  return result;
};

const deleteCertificate = async (id: string, authUser: IJwtPayload) => {
  if (authUser.role === Role.USER) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You are not able to delete the Certificate!',
    );
  }

  const result = await Certificate.findByIdAndDelete(id);
  return result;
};

export const CertificateService = {
  createCertificate,
  getCertificate,
  deleteCertificate,
};
