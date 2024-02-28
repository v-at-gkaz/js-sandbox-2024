import process from 'node:process';
import {env} from 'node:process';

// reading env
console.log('ENV?', env.PATH);


// exit code example
if(Boolean(+((new Date()).getSeconds())%2)) {
    process.exit(0);
} else {
    process.exit(42);
}

// test:
// node ex0.js
// echo $?
