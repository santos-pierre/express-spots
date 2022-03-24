import * as yup from 'yup';

const LoginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

export default LoginSchema;
