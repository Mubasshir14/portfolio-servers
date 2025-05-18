import { Router } from 'express';
import { ProjectController } from './project.controller';
import { multerUpload } from '../../app/config/multer.config';
import { Role } from '../User/user.interface';
import auth from '../../app/middleware/auth';
import { parseBody } from '../../app/middleware/bodyParser';

const router = Router();

router.get('/', ProjectController.getAllProject);
router.get('/:id', ProjectController.getProjectById);

router.post(
  '/',
  auth(Role.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  ProjectController.createProject,
);

router.patch(
  '/:id',
  auth(Role.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  ProjectController.updateProject,
);

router.delete('/:id', auth(Role.ADMIN), ProjectController.deleteProject);

export const ProjectRoutes = router;
