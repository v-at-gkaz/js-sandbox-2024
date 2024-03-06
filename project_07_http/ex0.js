import http from 'node:http';
import {env} from 'node:process';

const reqHandler = (req, res) => {
    console.log(`Request from: ${req.url}`);
    res.writeHead(Boolean(+((new Date()).getSeconds())%2) ? 200 : 500, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
};

const srv = http.createServer(reqHandler);

const port = env.PORT || 3000;

srv.listen(port, () => {
    console.log(`server running on port ${port}`);
});