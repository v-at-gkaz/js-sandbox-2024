import http from 'node:http';
import {env} from 'node:process';
import formidable from 'formidable';
import {cpSync} from 'node:fs';

const reqHandler = (req, res) => {
    const {method, url, headers} = req;

    // console.log(`HEADERS: `, headers);
    console.log(`METHOD: ${method}`);
    console.log(`Request from: ${url}`);

    if (method === 'GET' && url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <a href="/form1" target="_blank">Form1</a>
        `);
    } else if (method === 'GET' && url === '/form1') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <form action="/submit1" method="post" enctype="multipart/form-data">
                <div>
                    <b>Title:</b><br />
                    <input type="text" name="title" />     
                    <br />
                    <b>Title1:</b><br />
                    <input type="text" name="title1" />     
                    <br />
                     <b>File(s):</b><br />
                    <input type="file" name="my_file" multiple="multiple" />     
                    <br />
                    <input type="submit" value="Send">
                </div>       
                </form>
        `);
    } else if (method === 'POST' && url === '/submit1') {
        const form = formidable({multiples: true});
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Error parsing form');
            }
            const formData = {fields, files};
            const firstFile = formData.files['my_file'][0];
            cpSync(firstFile.filepath, `./${firstFile.newFilename}_${firstFile.originalFilename}`);

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<b>Form data:</b>');
            res.end(JSON.stringify(formData, null, 2));
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