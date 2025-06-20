import express, { Application, NextFunction, Request, Response } from 'express';
import { bookRouters } from './app/controllers/book.controller';

const app: Application = express();

app.use(express.json());
app.use('/books', bookRouters);

app.get('/', async (req: Request, res: Response) => {
    res.send("Welcome to Library Management System");
})

export default app;
