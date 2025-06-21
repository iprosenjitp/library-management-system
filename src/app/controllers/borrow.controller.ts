import express, { Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';

export const borrowRoutes = express.Router();

// POST - Create borrow
borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const borrow = await Borrow.create(body);

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Book borrowed failed",
            error: error instanceof Error ? error.message : error
        });
    }
});

// GET - Retrieve all borrows summary
borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const borrowSummary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: {$sum: "$quantity" }
                }
            }, {
                $lookup: {
                    from: "books",
                    localField: "_id", 
                    foreignField: "_id", 
                    as: "bookDetails" 
                }
            }, {
                $unwind: "$bookDetails" 
            }, {
                $project: {
                    _id: 0,
                    book : {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1,
                }
            }
        ]);

    
        res.status(201).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrowSummary
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve borrows",
            error: error instanceof Error ? error.message : error
        });
    }
});

