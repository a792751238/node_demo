const mongodb = require('mongodb');
const connect = require('../config/connect');
const BaseDao = require('./BaseDao');
const User = require('./User');
const util = require('./utils');
let ObjectID = mongodb.ObjectID;
//继承Dao  
class UserDao extends BaseDao {

    //获取用户信息 登录等  
    getUser(user, callback) {
        this.query(user, 'users', callback);
    }

    //用户注册 玩家 和管理员  
    saveUser(user, col, callback) {
        let _that = this;
        let model = Object.assign(JSON.parse(User), user);
        this.query(model, col, function (err, u) {
            //用户已经存在  
            if (u !== null) {
                err = 'notnull';
                return callback(err);
            }
            _that.save(model, col, callback);
        });
    };

    //普通用户注册  
    setUser(user, callback) {
        this.saveUser(user, 'users', callback);
    }

    updateUserOne(userUpdate, callback) {
        let ID = {};
        if (util.isString(userUpdate.id)) {
            ID = {_id: new ObjectID(userUpdate.id)};
        } else {
            ID = userUpdate.id;
        }
        this.updateOne('users', ID, {$set: userUpdate.field}, callback);
    }

    // 加入postId  
    updatePostId(userPost, callback) {
        let _that = this;
        this.updatePromise(userPost.id, 'postId').then(function (result) {
            let postId = result.data || [];
            postId.push(userPost.postId);
            let userUpdate = {
                id: result.id,
                field: {
                    postId: postId
                }
            };
            _that.updateUserOne(userUpdate, callback);
        }, function (err) {
            return err;
        });
    }

    updatePromise(id, key) {
        let _that = this;
        let ID = {_id: new ObjectID(id)};

        return new Promise(function (resolve, reject) {
            _that.query(ID, 'users', function (err, rtn) {
                if (err) {
                    reject(err);
                } else {
                    let result = {data: rtn[key], id: ID};
                    resolve(result);
                }
            });
        });
    }
}

module.exports = UserDao; 