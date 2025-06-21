import express, { Application, NextFunction, Request, Response } from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app: Application = express();

app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', async (req: Request, res: Response) => {
    res.send("Welcome to Library Management System");
})

export default app;
