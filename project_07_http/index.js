import http from 'node:http';
import {env} from 'node:process';

const reqHandler = (req, res) => {
    const {method, url } = req;

    console.log(`METHOD: ${method}`);
    console.log(`Request from: ${url}`);

    if(method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`GET request detected from: ${url}`);
    } else if (method === 'POST') {

        let data = '';

        req.on('data', chunk=>{
           data += chunk;
        });

        req.on('end', chunk=>{
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`POST request detected from: ${url} with data: ${data}`);
        });


    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method not allowed');
    }
};

const srv = http.createServer(reqHandler);

const port = env.PORT || 3000;

srv.listen(port, () => {
    console.log(`server running on port ${port}`);
});