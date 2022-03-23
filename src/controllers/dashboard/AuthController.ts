import { Request, Response } from 'express';
import expressSession from 'express-session';
import User from '../../models/User';
import bcrypt from 'bcrypt';

interface Session extends expressSession.Session {
    user?: {
        email: string;
    };
}

const showLogin = (_: Request, res: Response) => {
    res.render('pages/dashboard/login', { layout: 'app', title: 'Dashboard - Login' });
};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
        //TODO Error Display
        return res.json({ message: 'Wrong Email' });
    }
    // Check Password
    const samePassword: boolean = await bcrypt.compare(password, user.password);
    if (!samePassword) {
        //TODO Error Display
        return res.json({ message: 'Wrong Password' });
    }
    // Create Session
};

const logout = (_: Request, res: Response) => {
    res.send(501);
};

const AuthController = { login, logout, showLogin };

export default AuthController;
