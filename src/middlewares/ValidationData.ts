import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';
import type FormErrors from '../interfaces/FormErrors';

const ValidationData = (schema: AnyObjectSchema) => {
    return async (req: Request, _: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                const { inner } = error;
                const errors = inner.reduce((errors: FormErrors, obj) => {
                    let key = obj['path'];
                    if (key) {
                        if (!errors[key]) {
                            errors[key] = {
                                type: obj.type,
                                message: obj.errors[0],
                                value: obj.value,
                            };
                        }
                    }
                    return errors;
                }, {});
                req.hasFormError = true;
                req.formErrors = errors;
                next();
            }
        }
    };
};

export default ValidationData;
