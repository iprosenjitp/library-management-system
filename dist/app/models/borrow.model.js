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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Book quantity is required"],
        min: [0, "Quantity must be a positive number"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }
}, {
    versionKey: false,
    timestamps: true
});
// Interface methods
borrowSchema.method('checkBookAvailability', function checkBookAvailability(remainingCopies) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("this", this);
        // console.log("Remaining copies", remainingCopies);
        const bookId = this.book;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (remainingCopies === 0) {
            book.available = false;
        }
        yield book.save();
    });
});
// Pre hooks
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = this.book;
        const book = yield book_model_1.Book.findById(bookId);
        // console.log(this, "Pre hook");
        if (!book) {
            console.log("Book not found");
            throw new Error("Book not found");
        }
        const availableCopies = book.copies;
        const borrowedQuantity = this.quantity;
        if (availableCopies < borrowedQuantity) {
            // console.log("The book does not have enough available copies");
            throw new Error("The book does not have enough available copies");
        }
        next();
    });
});
// Post hooks
borrowSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(doc);
        const book = yield book_model_1.Book.findById(doc.book);
        if (!book) {
            throw new Error("Book not found");
        }
        book.copies -= doc.quantity;
        this.checkBookAvailability(book.copies);
        yield book.save();
        next();
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
