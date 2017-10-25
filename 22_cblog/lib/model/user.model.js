/**
 * Created by easterCat on 2017/10/25.
 */
module.exports = {
    createUser
};

const UserModel = require('../schema/user.schema');


//注册一个账号
function createUser(data) {
    console.log(data);
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