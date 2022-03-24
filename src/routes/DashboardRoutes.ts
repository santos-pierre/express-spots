import express from 'express';
import AuthController from '../controllers/dashboard/AuthController';
import ValidationData from '../middlewares/ValidationData';
import LoginSchema from '../validator/schema/LoginSchema';

const DashboardRoutes = express.Router();

DashboardRoutes.route('/login')
    .get(AuthController.showLogin)
    .post(ValidationData(LoginSchema), AuthController.login);
DashboardRoutes.post('/logout', AuthController.logout);

export default DashboardRoutes;
