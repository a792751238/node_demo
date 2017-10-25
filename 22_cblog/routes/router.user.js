/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const router = express.Router();

const {createUser} = require('../lib/model/user.model');

router.get('/register', (req, res) => {
    res.send('register');
});

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