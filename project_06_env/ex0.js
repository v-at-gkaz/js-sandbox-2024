import {env} from 'node:process';
const isDebugEnabled = Boolean(env.DEBUG === 'true');

function log() {
    if (isDebugEnabled) {
        console.log(arguments);
    }
}

log('ENV:', env);