/**
 * Created by easterCat on 2017/10/25.
 */
module.exports = {
    createUser,
    verifyUser
};
const fs = require('fs');
const UserModel = require('../schema/user.schema');

//查找user并验证
function verifyUser(data) {
    let user = {
        username: data.username,
        password: data.password,
    };

    return UserModel
        .findOne(user)
        .exec();
}

//注册一个账号
function createUser(data) {
    let user = {
        username: data.username,
        password: data.password,
        avatar: data.avatar,
        description: data.description,
        uploadDate: new Date()
    };

    return UserModel
        .create(user);
}