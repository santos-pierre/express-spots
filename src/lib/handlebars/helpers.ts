export function ternary(test: boolean, yes: any, no: any) {
    return test ? yes : no;
}

export function keyExist(object: Object, key: any) {
    if (object) {
        return object.hasOwnProperty(key);
    } else {
        return false;
    }
}
