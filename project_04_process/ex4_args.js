import process from 'node:process';
import {argv, stderr, stdout} from 'node:process';

const args = argv.slice(2);

if(args[0] && args[1]) {
    console.log('args:', args);
    stdout.write("Params ok\n");
    process.exit(0);
} else {
    stderr.write("HELP: arg 1 or/and 2 not found\n");
    process.exit(1);
}