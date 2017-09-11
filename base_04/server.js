/**
 * Created by easterCat on 2017/9/6.
 */


let http = require('http');
let url = require('url');
let router = require('./router.js');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-type': 'text/html;charset=utf8'});
    if (request.url !== "/favicon.ico") {
        console.log('welcome');
        let pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, '');
        router[pathname](request, response);
        response.end('end');
    }
}).listen(2345);

console.log('server running at http://127.0.0.1:2345');