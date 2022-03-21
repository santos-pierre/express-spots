import express from 'express';
import { config } from 'dotenv-flow';

config();

const { PORT, BASE_URL, NODE_ENV } = process.env;

const app = express();

app.get('/', (_, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
});
