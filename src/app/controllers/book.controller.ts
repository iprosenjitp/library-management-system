import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRoutes = express.Router();

// POST - Create book
bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error
        });
    }
});

// GET - Retrieve sll books
bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const filter = typeof req.query.filter === 'string' ? req.query.filter : "";
        const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : "title";
        const sortOrder = typeof req.query.sort === 'string' ? req.query.sort : "asc";
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;

        const books = await Book.find(filter ? { genre: filter } : {})
                .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
                .limit(limit);

        // const books = await Book.find();

        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error: any) {
        res.status(400).json({
            success: true,
            message: "Failed to retrieve books",
            error: error
        })
    }
});

// GET - Retrieve single book
bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    } catch (error: any) {
        res.status(400).json({
            success: true,
            message: "Failed to retrieve the book",
            error: error
        })
    }
});

// PATCH - Update book
bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    try {
        const updatedBook = req.body;
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndUpdate(bookId, updatedBook, {new: true});

        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Something went wrong",
            error: error
        });
    }
});

// DELETE - Delete book
bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId);

        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            message: "Something went wrong",
            error: error
        });
    }
});