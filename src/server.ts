import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let server: Server;
const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string);

        console.log("Connected to MongoDB using Mongoose");
        
        server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();