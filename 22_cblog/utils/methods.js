/**
 * Created by easterCat on 2017/11/7.
 */

const Q = require('q');
const _ = require('lodash');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports = {
    cursor,
    add,
    queryOne,
    updateById
};
/**
 *
 * @param Model
 * @param query <Object>
 * @param projection <Object> 要返回的可选字段
 */
function cursor(Model, query, projection = null) {
    // query.js的cursor
    return Model.find(query, projection).cursor();
}

function add(Model, data) {
    data = _.omit(data, '_id');
    return Model.create(data)

}

function queryOne(Model, query, projection = null) {

    return Model.findOne(query, projection)
        .then(data => data && data.view());
}

function updateById(Model, _id, data, upsert) {
    return Model.findByIdAndUpdate(_id, data, {new: true, upsert})
        .then(data => data && data.view());
}