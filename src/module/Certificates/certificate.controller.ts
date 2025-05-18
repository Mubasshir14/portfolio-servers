import { Request, Response } from 'express';
import { CertificateService } from './certificate.service';
import catchAsync from '../../app/utils/catchAsync';
import { IImageFile } from '../../app/interface/IImageFile';
import { IJwtPayload } from '../Auth/auth.interface';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createCertificate = catchAsync(async (req: Request, res: Response) => {
  const result = await CertificateService.createCertificate(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Certificate created succesfully',
    data: result,
  });
});

const getAllCertificate = catchAsync(async (req, res) => {
  const result = await CertificateService.getCertificate();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Certificate are retrieved succesfully',
    data: result,
  });
});

const deleteCertificate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CertificateService.deleteCertificate(
    id,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Certificate is deleted successfully',
    data: result,
  });
});

export const CertificateController = {
  createCertificate,
  getAllCertificate,
  deleteCertificate,
};
