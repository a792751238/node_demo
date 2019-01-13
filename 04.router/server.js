/**
 * Created by easterCat on 2017/9/6.
 */

let http = require("http");
let url = require("url");
let querystring = require("querystring");

const port = 3333;

http.createServer((request, response) => {
    if (request.url !== "/favicon.ico") {
        let pathname = url.parse(request.url).pathname;
        pathname = pathname.replace(/\//, "");
        if (pathname === "get_money") {
            get_money(request, response);
        } else if (pathname === "add") {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.writeHead(200, { "Content-type": "text/html;charset=utf8" });
            add(request, response);
        } else {
            response.setHeader("Access-Control-Allow-Origin", "*");
            response.writeHead(200, { "Content-type": "text/html;charset=utf8" });
            response.end("\r\n请求结束了", "utf-8");
        }
    }
}).listen(port);

console.log(`本地服务器创建成功=>localhost:${port}`);

function get_money(request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, { "Content-type": "text/html;charset=utf8" });
    response.write("给了你666块钱", "utf-8");
    response.end("\r\n请求结束了", "utf-8");
}

function add(request, response) {
    let post;

    request.on("data", function(chunk) {
        post += chunk;
    });

    post = querystring.stringify(post);

    request.on("end", function() {

        console.log(post.length)

        let options = {
            hostname: "api.bilibili.com",
            method: "POST",
            path: "https://api.bilibili.com/x/v2/reply/add",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": post.length,
                Origin: "https://www.bilibili.com",
                Referer: "https://www.bilibili.com/video/av8029794",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 Safari/537.36 Core/1.63.6788.400 QQBrowser/10.3.2843.400",
                Cookie: "LIVE_BUVID=AUTO3915443367808364; sid=cnib74gs; UM_distinctid=16791a6caa8729-0b14acda50efd2-33504275-1fa400-16791a6caa9a3f; CURRENT_FNVAL=16; buvid3=020B373C-97A4-4FCA-B8EA-3EEED06368A7155652infoc; rpdid=wdosppkkxlpw; fts=1544875242; CURRENT_QUALITY=32; stardustvideo=1; DedeUserID=4132416; DedeUserID__ckMd5=5ee126ea7781aa72; SESSDATA=73e9a848%2C1549874854%2C18b65911; bili_jct=af15b2a3a0e64a2ea304f885bea6bfd1; _dfcaptcha=e069f8b6c6316a825b2f145a7d8a5663"
            }
        };

        let req = http.request(options, res => {
            res.setEncoding("utf8");
            res.on("data", chunk => {
                response.end(`响应主体: ${chunk}`);
            });
            res.on("end", () => {
                response.end("\r\n请求add接口结束");
            });
        });

        req.on("error", e => {
            console.error(`请求遇到问题: ${e.message}`);
        });

        req.write(post);
        req.end();
    });
}
