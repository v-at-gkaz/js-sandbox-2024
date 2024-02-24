import Square from "./square.mjs";
import { Square123456 as Square2 } from "./square123456.mjs";

const o = new Square(4);
const o2 = new Square2(3);

console.log(`Square = ${o.area()}`);

console.log(`Square2 = ${o2.area()}`);


// async examples (mjs)

// promise
const p1 = new Promise((resolve, reject) => {
    console.log('timeout started');
    setTimeout(() => {
        console.log('timeout finished');
        if(Boolean(+((new Date()).getSeconds())%2)){
            resolve('success');
        } else {
            reject('error');
        }
    }, 2000);
});

// Working in mjs mode (but not working in cjs)!
try {
    const successResult = await p1;
    console.log('Async call success: ', successResult);
} catch(e) {
    console.log('Async call failed: ', e);
}