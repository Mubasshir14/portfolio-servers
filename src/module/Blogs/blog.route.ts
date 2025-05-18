import { Router } from 'express';
import { BlogController } from './blog.controller';
import { Role } from '../User/user.interface';
import auth from '../../app/middleware/auth';
import { multerUpload } from '../../app/config/multer.config';
import { parseBody } from '../../app/middleware/bodyParser';

const router = Router();

router.get("/", BlogController.getAllBlog)
router.get("/:id", BlogController.getBlogById)

router.post(
    '/',
    auth(Role.ADMIN),
    multerUpload.single('icon'),
    parseBody,
    BlogController.createBlog
);

router.patch(
    '/:id',
    auth(Role.ADMIN),
    multerUpload.single('icon'),
    parseBody,
    BlogController.updateBlog
)

router.delete(
    '/:id',
    auth(Role.ADMIN),
    BlogController.deleteBlog
)

export const BlogRoutes = router;
