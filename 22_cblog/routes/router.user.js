/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const cookie = require('cookie');
const router = express.Router();

const {createUser, verifyUser} = require('../lib/model/user.model');

router.get('/register', (req, res) => {
    res.send('register');
});

//登录
router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let user = {
        username: username,
        password: password,
    };

    //设置cookie
    res.cookie("user", {username: username, password: password}, {maxAge: 600000, httpOnly: false});

    verifyUser(user)
        .then((result) => {
            req.session.user = result;
            res.send(result);
        });
});

//注册一个用户
router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let avatar = req.body.avatar;
    let description = req.body.description;

    if (username && password && avatar && description) {
        let user = {
            username: username,
            password: password,
            avatar: avatar,
            description: description
        };
        createUser(user).then((result) => {
            res.send(result);
        });
    } else {
        res.send('this login information is wrong');
    }
});

//登录验证
router.get('/loggod', (req, res) => {
    let cookies = req.cookies.user;

    if (cookies) {
        //如果cookie中的username和password与session中保存的user一致，则认为当前用户已经登录
        if (cookies.username === req.session.user.username && cookies.password === req.session.user.password) {
            res.send(req.session.user);
        }
    } else {
        res.send({});
    }
});

//退出账号，删除cookie
router.get('/logout', function (req, res, next) {
    //清空session
    req.session.user = null;
    //删除Cookie
    res.clearCookie('user');
});


module.exports = router;