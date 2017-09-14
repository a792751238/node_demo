/**
 * Created by easterCat on 2017/9/12.
 */
const http=require("http");
const express = require('express');
const app = express();

//挂载静态资源处理中间件
app.use(express.static(__dirname + "/public"));
//设置模板视图的目录
app.set("views", "./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "ejs");

app.get('/reg', function(req, res) {

    res.render('reg/reg', {
        title: '注册',
        pwd_err: req.session.pwd_err
    });
});

const server = app.listen(4000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});