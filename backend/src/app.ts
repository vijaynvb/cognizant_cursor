import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './errors';
import { requestIdMiddleware } from './middleware/requestId';
import { setupSwagger } from './swagger';
import { authRoutes } from './routes/authRoutes';
import { taskRoutes } from './routes/taskRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { notificationRoutes } from './routes/notificationRoutes';
import { reportRoutes } from './routes/reportRoutes';
import { userRoutes } from './routes/userRoutes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware);
app.use(morgan('combined'));

setupSwagger(app);

app.use('/v1/auth', authRoutes);
app.use('/v1/tasks', commentRoutes);
app.use('/v1/tasks', taskRoutes);
app.use('/v1/notifications', notificationRoutes);
app.use('/v1/reports', reportRoutes);
app.use('/v1/users', userRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
