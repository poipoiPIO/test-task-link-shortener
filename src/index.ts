import express from 'express';
import { connectDB } from './db/mongo-connector';
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import userRoute from './routes/user';
import shortnerRoute from './routes/shortner';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/user', userRoute);
app.use('/', shortnerRoute);

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
