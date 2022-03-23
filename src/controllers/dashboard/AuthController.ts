import { Request, Response } from 'express';

const showLogin = (_: Request, res: Response) => {
    res.render('pages/dashboard/login', { layout: 'app', title: 'Dashboard - Login' });
};

const login = (_: Request, res: Response) => {
    res.send(501);
};

const logout = (_: Request, res: Response) => {
    res.send(501);
};

const AuthController = { login, logout, showLogin };

export default AuthController;
