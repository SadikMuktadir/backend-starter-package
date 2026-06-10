import express, { Request, Response } from 'express';
import config from './app/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './utils/errorHandler/globalErrorHandle';
import notFound from './middlewares/notFound';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: `Server is running at ${config.port}`,
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
