import { Router } from 'express';
import { UserRoutes } from '../../module/User/user.routes';
import { AuthRoutes } from '../../module/Auth/auth.routes';
import { ProjectRoutes } from '../../module/Projects/project.route';
import { SkillRoutes } from '../../module/Skills/skill.route';
import { BlogRoutes } from '../../module/Blogs/blog.route';
import { CertificateRoutes } from '../../module/Certificates/certificate.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/project',
    route: ProjectRoutes,
  },
  {
    path: '/skill',
    route: SkillRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/contact',
    route: CertificateRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
