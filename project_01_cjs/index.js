const Square = require('./square.js');
const o = new Square(4);
console.log(`Square = ${o.area()}`);


// async examples (cjs)

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


// Not working in cjs mode!
// try {
//     const successResult = await p1;
//     console.log('Async call success: ', successResult);
// } catch(e) {
//     console.log('Async call failed: ', e);
// }


// classic working with promise
// p1.then(state=>{
//     console.log('then detected', state);
// }).catch(err=>{
//     console.log('catch detected', err);
// }).finally(()=>{
//     console.log('finally detected');
// });


// working woth promise (async/await) v1

// async await in cjs
// async function runner(){
//     try {
//         const successResult = await p1;
//         console.log('Async call success: ', successResult);
//     } catch(e) {
//         console.log('Async call failed: ', e);
//     }
// }
// runner();



// working woth promise (async/await) v2

// (async function(){
//     try {
//         const successResult = await p1;
//         console.log('Async call success: ', successResult);
//     } catch(e) {
//         console.log('Async call failed: ', e);
//     }
// })();


// working woth promise (async/await) v3

(async () => {
    try {
        const successResult = await p1;
        console.log('Async call success: ', successResult);
    } catch(e) {
        console.log('Async call failed: ', e);
    }
})();