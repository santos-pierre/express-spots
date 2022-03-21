import express from 'express';
import { config } from 'dotenv-flow';
import { engine } from 'express-handlebars';

config();

const { PORT, BASE_URL, NODE_ENV } = process.env;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views`);

app.use(express.static('public'));

app.get('/', (_, res) => {
    res.render('pages/home/index');
});

app.listen(PORT, () => {
    console.log(`Server running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
});
