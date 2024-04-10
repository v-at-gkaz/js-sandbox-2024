import {createHmac} from "crypto";

export function getJwt(payload: any, jwtSecret: string): string {
    const head = Buffer.from(JSON.stringify({alg: 'HS256', typ: 'jwt'})).toString('base64');
    const body = Buffer.from(JSON.stringify(payload)).toString('base64');
    const sig = createHmac('SHA256', jwtSecret).update(`${head}.${body}`).digest('base64');
    return `${head}.${body}.${sig}`;
};

export function isJwtOk(jwt: string, jwtSecret: string): boolean {
    const tokenParts = jwt.split('.');
    const sigFromJwt = tokenParts[2];
    const sig = createHmac('SHA256', jwtSecret).update(`${tokenParts[0]}.${tokenParts[1]}`).digest('base64');
    return sigFromJwt.toString() === sig.toString();
};