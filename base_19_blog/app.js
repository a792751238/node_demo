/**
 * Created by easterCat on 2017/9/12.
 */




var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
// const pkg = require('./package');
var winston = require('winston');


let app = express();

//挂载静态资源处理中间件
app.use(express.static(__dirname + "/public"));
//设置模板视图的目录
app.set("views", "./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "ejs");

// session 中间件
app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));
// flash 中间件，用来显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname, 'public/images'),// 上传文件目录
    keepExtensions: true// 保留后缀
}));

// 设置模板全局常量
app.locals.blog = {
    title: 'hello world',
    description: 'hello world'
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});

// 路由
routes(app);


const server = app.listen(config.port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`应用实例，访问地址为 http://${host}:${port}`);
});