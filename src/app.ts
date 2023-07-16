import express from 'express';
import cookieParser from 'cookie-parser';
import usersRoutes from './http/controllers/users/routes';
import animesRoutes from './http/controllers/animes/routes';
import episodesRoutes from './http/controllers/episodes/routes';

export const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.use(usersRoutes);
app.use(animesRoutes);
app.use(episodesRoutes);
