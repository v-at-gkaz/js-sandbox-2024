import {spawn} from 'node:child_process';
import {exit} from 'node:process';
import {join} from 'node:path';

const ex01FilePath = join('..', 'project_04_process', 'ex0.js');

console.log('Test ex01FilePath:', ex01FilePath);

const ls = spawn('node.exe', [ex01FilePath]);

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