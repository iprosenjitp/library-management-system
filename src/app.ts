import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

app.get('/', async (req: Request, res: Response) => {
    res.send("Welcome to Library Management System");
})

export default app;
