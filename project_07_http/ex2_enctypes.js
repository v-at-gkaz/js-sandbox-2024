import http from 'node:http';
import {env} from 'node:process';

const reqHandler = (req, res) => {
    const {method, url, headers} = req;

    // console.log(`HEADERS: `, headers);
    console.log(`METHOD: ${method}`);
    console.log(`Request from: ${url}`);

    if (method === 'GET' && url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <a href="/form1" target="_blank">Form1</a><br />
                <a href="/form2" target="_blank">Form2</a><br />
                <a href="/form3" target="_blank">Form3</a><br />
        `);
    } else if (method === 'GET' && url === '/form1') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <form action="/submit1" method="post" enctype="application/x-www-form-urlencoded">
                <div>
                    <b>Title:</b><br />
                    <input type="text" name="title" />     
                    <br />
                    <b>Title1:</b><br />
                    <input type="text" name="title1" />     
                    <br />
                    <input type="submit" value="Send">
                </div>       
                </form>
        `);
    } else if (method === 'GET' && url === '/form2') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <form action="/submit2" method="post" enctype="text/plain">
                <div>
                    <b>Title:</b><br />
                    <input type="text" name="title" />     
                    <br />
                    <b>Title1:</b><br />
                    <input type="text" name="title1" />     
                    <br />
                    <input type="submit" value="Send">
                </div>       
                </form>
        `);
    } else if (method === 'GET' && url === '/form3') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
                <form action="/submit3" method="post" enctype="multipart/form-data">
                <div>
                    <b>Title:</b><br />
                    <input type="text" name="title" />     
                    <br />
                    <b>Title1:</b><br />
                    <input type="text" name="title1" />     
                    <br />
                    <input type="submit" value="Send">
                </div>       
                </form>
        `);
    } else if (method === 'POST' && url === '/submit1') {

        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', chunk => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            const dataValues = data.split('&');
            const dataValues2 = dataValues.map(itm => {
                const parsedItem = itm.split('=');
                return {
                    key: parsedItem[0],
                    value: parsedItem[1]
                }
            });
            console.log('debug >>>>', dataValues2);
            res.end(`<b>POST</b> request detected from: ${url} with data: ${JSON.stringify(dataValues2)}`);
        });
    } else if (method === 'POST' && url === '/submit2') {

        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', chunk => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            const dataValues = data.split('\r\n').slice(0, -1);
            const dataValues2 = dataValues.map(itm => {
                const parsedItem = itm.split('=');
                return {
                    key: parsedItem[0],
                    value: parsedItem[1]
                }
            });
            console.log('debug >>>>', dataValues2);
            res.end(`<b>POST</b> request detected from: ${url} with data: ${JSON.stringify(dataValues2)}`);
        });
    } else if (method === 'POST' && url === '/submit3') {

        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', chunk => {
            res.writeHead(200, {'Content-Type': 'text/html'});

            const contentType = headers['content-type'];
            const contentTypeParsed = contentType.split(';');
            const boundaryString = contentTypeParsed[1].trim();
            const boundaryValue = '--' + boundaryString.split('=')[1];

            const dataSplittedWithBoundary = data.split(boundaryValue);

            const dataValues = dataSplittedWithBoundary.map(itm => {
                if (itm.includes('Content-Disposition')) {
                    const parsedItem = itm.split('name=');
                    const parsedItemField = parsedItem[1].replace(/\r\n/g, '');
                    const parsedItemFieldKeyValue = parsedItemField.split('"').slice(1);
                    return {
                        key: parsedItemFieldKeyValue[0],
                        value: parsedItemFieldKeyValue[1]
                    }
                }
            }).filter(itm => {
                if (itm) {
                    return itm;
                }
            });

            console.log('debug >>>>', dataValues);
            res.end(`<b>POST</b> request detected from: ${url} with data: ${JSON.stringify(dataValues)}`);
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