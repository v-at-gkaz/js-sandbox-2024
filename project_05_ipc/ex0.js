import { spawn } from 'node:child_process';
import { exit } from 'node:process';

const ls = spawn('C:\\Windows\\System32\\notepad.exe', []);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    exit(code);
});