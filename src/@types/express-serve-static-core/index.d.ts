import { Express } from 'express-serve-static-core';
import FormErrors from '../../interfaces/FormErrors';
declare module 'express-serve-static-core' {
    interface Request {
        hasFormError: boolean;
        formErrors: FormErrors;
        tenant: string;
    }
}
