import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const bookRouters = express.Router();

// POST - Create book
bookRouters.post('/', async (req: Request, res: Response) => {
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
bookRouters.get('/', async (req: Request, res: Response) => {
    const filter = req.query.filter ? req.query.filter : "";
    const sortBy = req.query.sortBy ? req.query.sortBy : "";
    const sortOrder = req.query.sort ? req.query.sort : "asc";
    const limit = req.query.limit ? req.query.limit : 10;

    // const books = await Book.find({genre: filter})
    //     .sort({[sortBy]: sortOrder})
    //     .limit(parseInt(limit));

    const books = await Book.find();

    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
});

// GET - Retrieve single book
bookRouters.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
});

// PATCH - Update book
bookRouters.patch('/:bookId', async (req: Request, res: Response) => {
    const updatedBook = req.body;
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndUpdate(bookId, updatedBook, {new: true});

    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
});

// DELETE - Delete book
bookRouters.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId);

    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
});