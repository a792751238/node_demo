/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
    if (request.url !== "/favicon.ico") {
      //清除第2此访问
      console.log("welcome");
      response.write("hello world");
      response.end("你好，世界");
    }
  })
  .listen(8888);
  
console.log("server running at http://127.0.0.1:8888/");
