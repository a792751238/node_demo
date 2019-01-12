/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");

const port = 3333;

http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, { "Content-type": "text/html;charset=utf8" });

    if (request.url !== "/favicon.ico") {
        let pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, "");
        if (pathname === "get_money") {
            get_money(request, response);
        }
        response.end("\r\n钱给完了,没了", "utf-8");
    }
}).listen(port);

console.log(`本地服务器创建成功=>localhost:${port}`);

function get_money(request, response) {
    response.write("给了你666块钱", "utf-8");
}
