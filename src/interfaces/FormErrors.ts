export default interface FormErrors {
    [key: string]: { type: string | undefined; message: string; value: string | number | undefined };
}
