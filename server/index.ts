import 'dotenv/config'
import mongoose from "mongoose";
import express from 'express';
import authRouter from './routes/auth.routes';

/**
 * TODO before the end:
 * 1) Нужно типизировать запросы.
 */

const server = express();

server.use(express.json());
server.use("/api/auth", authRouter);

const runServer = async () => {
    try {
        const PORT = process.env.PORT;
        const DB_URL = process.env.DB_URL;

        if (!PORT || !DB_URL) {
            throw new Error('Server configurations was not specified');
        }

        await mongoose.connect(DB_URL);

        server.listen(PORT, () => {
            console.log('Server started on port: ' + PORT);
        });
    } catch (err: unknown) {
        console.log('Server start error');
    }
}

runServer();