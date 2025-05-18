import { Router } from 'express';
import { Role } from '../User/user.interface';
import { SkillController } from './skill.controller';
import auth from '../../app/middleware/auth';
import { multerUpload } from '../../app/config/multer.config';
import { parseBody } from '../../app/middleware/bodyParser';

const router = Router();

router.get('/', SkillController.getAllSkill);
router.get('/:id', SkillController.getSkillById);

router.post(
  '/',
  auth(Role.ADMIN),
  multerUpload.single('icon'),
  parseBody,
  SkillController.createSkill,
);

router.delete('/:id', auth(Role.ADMIN), SkillController.deleteSkill);

export const SkillRoutes = router;
