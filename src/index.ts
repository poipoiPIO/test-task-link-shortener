import express from 'express';
import { connectDB } from './db/connect';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import authRoute from './routes/auth';
import protectedRoutes from './routes/protected';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/user', authRoute);
app.use('/', protectedRoutes);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    } catch (err) {
        console.log(err);
    }
};

start();
