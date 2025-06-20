import { Schema } from "mongoose";
import { IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks> ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    copies: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true
    }
})