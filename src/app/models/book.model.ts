import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/book.interface";

const bookSchema = new Schema<IBooks> ({
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
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Book = model<IBooks>("Book", bookSchema);