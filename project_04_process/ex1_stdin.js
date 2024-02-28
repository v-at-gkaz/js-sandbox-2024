import process from 'node:process';
import {env, stdin} from 'node:process';

let data = '';
stdin.on('readable', () => {
    const chunk = stdin.read();
    if (chunk !== null) {
        console.log('chunk detected:');
        data += chunk;
    }
});

stdin.on('end', () => {
    console.log('end detected. Received data: ', data);
    process.exit(0);
});

// node ex1.js <<< 'Some text'

// ls -l | node ex1.js