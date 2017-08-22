/**
 * Created by easterCat on 2017/8/22.
 */
const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log(`request ${pathname} receivrd`);

        route(handle, pathname);

        response.writeHead(200, {'Content-type': 'text/plain'});
        response.write('hello world');
        response.end(`server running at port 3333`);
    }

    http.createServer(onRequest).listen(3333);
    console.log('server has started');
}

exports.start = start;


//方法1
// http.createServer((request, response) => {
//     response.writeHead(200, {'Content-type': 'text/plain'});
//     response.write('hello world');
//     response.end();
// }).listen(3333);