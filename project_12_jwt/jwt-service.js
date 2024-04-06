import {createHmac} from "crypto";

export function getJwt(payload, jwtSecret) {
    const head = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'jwt'})).toString('base64'); //.replace(/=$/, '');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64'); //.replace(/=$/, '');
    const sig = createHmac('SHA256', jwtSecret).update(`${head}.${body}`).digest('base64'); //.replace(/=$/, '');
    return `${head}.${body}.${sig}`;
};

export function isJwtOk(jwt, jwtSecret) {
    const tokenParts = jwt.split('.');
    const sigFromJwt = tokenParts[2];
    const sig = createHmac('SHA256', jwtSecret).update(`${tokenParts[0]}.${tokenParts[1]}`).digest('base64');

    // console.log('check?', sigFromJwt, sig);

    return sigFromJwt.toString() === sig.toString();
};