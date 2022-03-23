import prisma from '../utils/prisma';

const getUserByEmail = async (email: string) => {
    const user = prisma.user.findUnique({ where: { email } });
    return user;
};

const User = { getUserByEmail };

export default User;
