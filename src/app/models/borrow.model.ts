import { Model, model, Schema } from "mongoose";
import { IBorrow, UserInterfaceMethods } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow, Model<IBorrow>, UserInterfaceMethods> ({
    book: {
        type: Schema.Types.ObjectId,
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
borrowSchema.method('checkBookAvailability', async function checkBookAvailability(remainingCopies: number) {
    // console.log("this", this);
    // console.log("Remaining copies", remainingCopies);

    const bookId = this.book;
    const book = await Book.findById(bookId);

    if(!book) {
        throw new Error("Book not found");
    }

    if(remainingCopies === 0) {
        book.available = false;
    }

    await book.save();
})

// Pre hooks
borrowSchema.pre("save", async function(next) {
    const bookId = this.book;
    const book = await Book.findById(bookId);

    // console.log(this, "Pre hook");

    if(!book) {
        console.log("Book not found");
        throw new Error("Book not found");
    }

    const availableCopies = book.copies;
    const borrowedQuantity = this.quantity;

    if(availableCopies < borrowedQuantity) {
        // console.log("The book does not have enough available copies");
        throw new Error("The book does not have enough available copies");
    }

    next();
});

// Post hooks
borrowSchema.post("save", async function (doc, next) {
    // console.log(doc);

    const book = await Book.findById(doc.book);

    if(!book) {
        throw new Error("Book not found");
    }
    
    book.copies -= doc.quantity;

    this.checkBookAvailability(book.copies);

    await book.save();

    next();
})

export const Borrow = model<IBorrow>("Borrow", borrowSchema);