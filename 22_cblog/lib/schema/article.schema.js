/**
 * Created by easterCat on 2017/10/19.
 */
const _ = require('lodash');
const mongoose = require('../db');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;
const {bindMethods} = require('../../utils/index');

let ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required !']
    },  //标题
    content: {
        type: String,
        required: [true, 'content is required !']
    }, //内容
    createDate: {
        type: Date
    }, //创建时间
    checkinTime: {
        type: Date
    },
    pv: {
        type: Number
    }//文章访问次数
});

function allKeys() {
    return _.without(_.keys(serverSchema.paths), '__v');
}

ArticleSchema.methods.view = function () {
    return _.pick(this, allKeys());
};

const ArticleModel = bindMethods(mongoose.model('Article', ArticleSchema));//将Schema发布为Model

module.exports = ArticleModel;