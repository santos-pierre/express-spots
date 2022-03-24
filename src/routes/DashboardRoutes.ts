import express from 'express';
import AuthController from '../controllers/dashboard/AuthController';

const DashboardRoutes = express.Router();

DashboardRoutes.route('/login').get(AuthController.showLogin).post(AuthController.login);
DashboardRoutes.post('/logout', AuthController.logout);

export default DashboardRoutes;
