import { Router } from 'express';
import auth from '../../app/middleware/auth';
import { Role } from './user.interface';
import { UserController } from './user.controller';
import { parseBody } from '../../app/middleware/bodyParser';
import { multerUpload } from '../../app/config/multer.config';

const router = Router();

router.get('/', auth(Role.ADMIN), UserController.getAllUser);

router.get('/me', auth(Role.ADMIN, Role.USER), UserController.myProfile);

router.post('/create-user',  UserController.registerUser);
// update profile
router.patch(
  '/update-profile',
  auth(Role.ADMIN),
  multerUpload.single('file'),
  parseBody,
  UserController.updateProfile,
);

router.patch('/:id/status', auth(Role.ADMIN), UserController.updateUserStatus);

export const UserRoutes = router;
