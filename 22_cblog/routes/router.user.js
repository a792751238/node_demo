/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
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
    // res.cookie("user", {username: username}, {maxAge: 600000, httpOnly: false});

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

    let user = {
        username: username,
        password: password,
        avatar: avatar,
        description: description
    };

    createUser(user).then((result) => {
        res.send(result);
    });
});

module.exports = router;