import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://mubasshir-portfolio-dashboard.vercel.app/',
      'https://personal-portfolio-blog-nu.vercel.app',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Running 🏃‍♂️🏃‍♂️🏃🏃',
  });
};

app.get('/', getAController);

export default app;
