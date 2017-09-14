/**
 * Created by easterCat on 2017/9/12.
 */
const http = require("http");
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const utils = require('./pratice/utils');
const userModel = require('./models/user_base');

let registerRouter = require('./routes/register');

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

//注册  
app.get('/register', registerRouter);

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

const server = app.listen(4000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});