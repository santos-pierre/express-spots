import express from 'express';
import { config } from 'dotenv-flow';
import { engine } from 'express-handlebars';
import session from 'express-session';
import connectPG from 'connect-pg-simple';
import DashboardRoutes from './routes/DashboardRoutes';

config();

const { PORT, BASE_URL, NODE_ENV, SECRET_SESSION } = process.env;

const app = express();

/*=============START VIEW ENGINE=================*/
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', `${process.cwd()}/src/views`);
/*==============END VIEW ENGINE==================*/

/*==============START STATIC FILES===============*/
app.use(express.static('public'));
/*===============END STATIC FILES================*/

/*==============START SESSION====================*/
app.use(
    session({
        store: new (connectPG(session))(),
        name: 'SPOT_SESSION',
        secret: SECRET_SESSION || 'keyboard cat',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: NODE_ENV !== 'development',
        },
    })
);
/*===============END SESSION====================*/

/*=============START GLOBAL MIDDLEWARE =========*/
app.use(express.urlencoded({ extended: true }));
/*=============END GLOBAL MIDDLEWARE ===========*/

/*===============START ROUTING==================*/
app.get('/', (_, res) => {
    res.render('pages/home/index');
});

app.use('/dashboard', DashboardRoutes);
/*===============END ROUTING====================*/

app.listen(PORT, () => {
    console.log(`Server running on : ${BASE_URL}:${PORT} [${NODE_ENV}]`);
});
