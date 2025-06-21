"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
            message: `{VALUE}, is not a valid type`
        },
        required: [true, "Book genre is required"]
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, "ISBN must be UNIQUE"],
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    copies: {
        type: Number,
        required: [true, "Book copies is required"],
        min: [0, "Copies must be a positive number"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
