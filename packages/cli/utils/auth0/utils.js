import crypto from 'crypto';
export function isNonEmptyString(s) {
    return typeof s === 'string' && s.length > 0;
}
export function mkDeferred() {
    let resolvePromise;
    let rejectPromise;
    const promise = new Promise((resolve, reject) => {
        resolvePromise = resolve;
        rejectPromise = reject;
    });
    return {
        resolve: (value) => resolvePromise(value),
        reject: (error) => rejectPromise(error),
        promise
    };
}
export function genRandom(size) {
    return crypto.randomBytes(size);
}
export function genRandomString(size) {
    return genRandom(size).toString('hex');
}
export function sha256(value) {
    return crypto.createHash('sha256').update(value).digest();
}
export function encodeBase64(value) {
    return value
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
/**
 * Returns a promise that ALWAYS REJECTS after `duration`.
 */
export function startTimeout(duration) {
    let cancel;
    const promise = new Promise((_, reject) => {
        const timeout = setTimeout(reject, duration);
        cancel = () => { clearTimeout(timeout); };
    });
    return {
        cancel: () => cancel(),
        promise
    };
}
