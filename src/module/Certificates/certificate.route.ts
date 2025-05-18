import { Router } from 'express';
import { CertificateController } from './certificate.controller';
import { Role } from '../User/user.interface';
import auth from '../../app/middleware/auth';
import { multerUpload } from '../../app/config/multer.config';
import { parseBody } from '../../app/middleware/bodyParser';

const router = Router();

router.get('/', CertificateController.getAllCertificate);

router.post(
  '/',
  auth(Role.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  CertificateController.createCertificate,
);

router.delete(
  '/:id',
  auth(Role.ADMIN),
  CertificateController.deleteCertificate,
);

export const CertificateRoutes = router;
