import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';

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
    req.session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        profile_img: user.profile_img,
    };

    return res.redirect('/');
};

const logout = (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    res.clearCookie('SPOT_SESSION');
    res.redirect('/');
};

const AuthController = { login, logout, showLogin };

export default AuthController;
