"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// POST - Create book
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error instanceof Error ? error.message : error
        });
    }
}));
// GET - Retrieve sll books
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = typeof req.query.filter === 'string' ? req.query.filter : "";
        const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : "title";
        const sortOrder = typeof req.query.sort === 'string' ? req.query.sort : "asc";
        const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;
        const books = yield book_model_1.Book.find(filter ? { genre: filter } : {})
            .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
            .limit(limit);
        // const books = await Book.find();
        res.status(201).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "Failed to retrieve books",
            error: error
        });
    }
}));
// GET - Retrieve single book
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "Failed to retrieve the book",
            error: error
        });
    }
}));
// PATCH - Update book
exports.bookRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = req.body;
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "Something went wrong",
            error: error
        });
    }
}));
// DELETE - Delete book
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(201).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(400).json({
            success: true,
            message: "Something went wrong",
            error: error
        });
    }
}));
