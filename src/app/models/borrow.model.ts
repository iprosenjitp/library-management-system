import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow> ({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Book quantity is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);