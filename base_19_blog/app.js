/**
 * Created by easterCat on 2017/9/12.
 */
const http = require("http");
const path = require('path');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const multer = require('multer');
const config = require('config-lite')(__dirname);
const cookieParser = require('cookie-parser');

const utils = require('./pratice/utils');
const userModel = require('./models/user_base');
const routes = require('./routes');
// const pkg = require('./package');


let app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp'}).array('image'));
app.use(cookieParser());
//挂载静态资源处理中间件
app.use(express.static(__dirname + "/public"));
//设置模板视图的目录
app.set("views", "./public/views");
//设置是否启用视图编译缓存，启用将加快服务器执行效率
app.set("view cache", true);
//设置模板引擎的格式即运用何种模板引擎
app.set("view engine", "ejs");

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
    uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
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

//注册  
// app.get('/register', registerRouter);

//注册提交  
app.post('/reg', function (req, res) {
    // if (!util.isEqual(req.body.pwd, req.body.repeatpwd)) {
    //     req.session.pwd_err = true;
    //     return res.redirect('/reg');
    // }

    let pwd = utils.mix(req.body.pwd);
    let user = [{
        "email": req.body.email,
        "pwd": pwd
    }];

    console.log(user);
    userModel.addUser(user);
});


//进入登录页面
app.get('/login', function (req, res) {
    res.render('login/login', {
        title: '登录',
    });
});

//登录
app.post('/login', function (req, res) {
    if (utils.isNull(req.body.email)) {
        return res.redirect('/login');
    }
    if (utils.isNull(req.body.pwd)) {
        return res.redirect('/login');
    }

    //用户查找
    let pwd = utils.mix(req.body.pwd);
    let User = {
        "email": req.body.email,
        "pwd": pwd
    };
    userModel.queryUser(User, function (result) {
        console.log(result);
        if (result === null) {
            return res.redirect('/reg');
        }
        console.log('end of query');
        return res.redirect('/personal/' + result[0]._id);
    });
});
//个人中心
app.get('/personal/:_id', function (req, res) {
    res.render('personal/personal', {
        title: '个人中心',
    });
});

const server = app.listen(config.port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`应用实例，访问地址为 http://${host}:${port}`);
});