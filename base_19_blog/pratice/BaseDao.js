const connect = require('../config/connect');
const mongodb = require('mongodb');
let ObjectID = mongodb.ObjectID;

class BaseDao {
    //查询 field查询字段, col 集合或表  
    query(field, col, callback) {
        connect.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            //要查找的集合  
            db.collection(col, function (err, collection) {
                //要查找的字段  
                collection.findOne(field, function (err, result) {
                    connect.close();
                    if (err) {
                        return callback(err);
                    }
                    //成功  
                    callback(null, result);
                });
            });
        });
    }

    //查找排序 query={field: field, orderby: orderby, }  
    querySort(query, col, callback) {
        connect.open(function (err, db) {
            if (err) return callback(err);
            db.collection(col, function (err, collection) {
                if (query.limit) {
                    collection.find(query.field).sort(query.orderby).limit(query.limit).toArray(function (err, result) {
                        connect.close();
                        if (err) return callback(err);
                        callback(null, result);
                    });
                } else {
                    collection.find(query.field).sort(query.orderby).toArray(function (err, result) {
                        connect.close();
                        if (err) return callback(err);
                        callback(null, result);
                    });
                }
            });
        });
    }

    //查询首页全部  
    queryAll(col, query, callback) {
        connect.open(function (err, db) {
            if (err) return callback(err);
            db.collection(col, function (err, collection) {
                collection.find().sort(query.sort).limit(query.limit).toArray(function (err, result) {
                    connect.close();
                    if (err) return callback(err);
                    callback(null, result);
                });
            });
        });
    }

    //保存 新建  
    save(field, col, callback) {
        connect.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            db.collection(col, function (err, collection) {
                //if(field._id) delete field._id;  
                collection.insert(field, {
                    safe: true
                }, function (err, result) {
                    connect.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, result);
                });
            });
        });
    }

    //只修改一个 根据Id查找  
    updateOne(col, id, updateField, callback) {
        connect.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            db.collection(col, function (err, collection) {
                collection.updateOne(id, updateField, function (err, result) {
                    connect.close();
                    if (err) {
                        return callback(err);
                    }
                    //成功  
                    callback(null, result);
                });
            });
        });
    }

    //更新  
    updates(col, field, updateFields, callback) {
        connect.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            db.collection(col, function (err, collection) {
                collection.update(field, updateFields, function (err, result) {
                    connect.close();
                    if (err) {
                        return callback(err);
                    }
                    //成功  
                    callback(null, result);
                });
            });
        });
    }

    //删除一个表  
    removeOne(col, field, callback) {
        connect.open(function (err, db) {
            if (err) {
                return callback(err);
            }
            db.collection(col, function (err, collection) {
                collection.removeOne(field, function (err, result) {
                    connect.close();
                    if (err) {
                        return callback(err);
                    }
                    //成功  
                    callback(null, result);
                });
            });
        });
    }
}

module.exports = BaseDao;  