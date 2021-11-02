import express from 'express';
import session from 'express-session'
import path from 'path';
import passport from 'passport';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser'
import * as http from 'http';
import routerRead from '../routes/routerProduct';
import routerLogin from '../routes/routerLogin';
import { dbConnection } from '../models/mensajesDB';
import { initWSServer } from '../api/sockets';

const app = express();
const server = http.Server(app);

app.use(
  session({
    secret: 'your secret line of secretness',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

dbConnection.init();
initWSServer(server);


const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPath,
    extname: 'hbs',
  })
);

export const publicPath = path.resolve(__dirname, '../public');

app.use(cookieParser());
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerRead);
app.use('/', routerLogin);

export default app;