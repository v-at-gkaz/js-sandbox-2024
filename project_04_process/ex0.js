import {env, stdout, stderr, exit} from 'node:process';

// reading env
console.log('ENV.PATH:', env.PATH);

// exit code example
if(Boolean(+((new Date()).getSeconds())%2)) {
    stdout.write('Stdout 0 detected');
    exit(0);
} else {
    stderr.write('Stderr 42 detected');
    exit(42);
}

// test:
// node ex0.js
// echo $?
