/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const cookie = require('cookie');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logged', logged);
router.get('/logout', logout);

const {
    createUser,
    verifyUser,
    findUserById
} = require('../lib/model/user.model');

//登录
function login(req, res) {
    const {username, password} = req.method === 'POST' ? req.body : req.query;

    let user = {
        username: username,
        password: password,
    };

    return verifyUser(user)
        .then((result) => {
            _updateSession(result);
            req.session.user = result;
            res.send(result);
        });

    function _updateSession(user) {
        req.session.username = user.username;
        req.session.password = user.password;
        req.session.user_id = user._id.toString();
    }
}


//注册一个用户
function register(req, res) {
    if (!req.body) return;
    if (!req.body.username || !req.body.password) {
        throw {
            code: 1,
            message: 'name or password is null'
        };
    }

    const {username, password, description} = req.body;

    let user = {
        username: username,
        password: password,
        description: description
    };

    //如果头像存在
    if (req.body.avatar) {
        user.avatar = req.body.avatar;
        createUser(user).then((result) => {
            res.send(result);
        });
    } else {
        user.avatar = null;
        createUser(user).then((result) => {
            res.send(result);
        });
    }
}


//登录验证
function logged(req, res) {
    const {user_id, username, password} = req.session;

    let info = {
        logged: false,
        user: null
    };

    if (!username || !user_id || !password) {
        return new Promise((resolve) => {
            resolve(info);
        });
    }

    return findUserById(user_id)
        .then(result => {
            info.logged = true;
            info.user = result;
            res.send(info);
        });
}


//退出账号，清空session,删除cookie
function logout(req, res) {
    //清空session
    const {
        username,
        password,
        user_id
    } = req.session;

    delete username;
    delete password;
    delete user_id;
}

module.exports = router;
