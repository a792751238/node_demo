/**
 * Created by easterCat on 2017/10/19.
 */

const mongoose = require('../db');
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: {type: String},  //标题
    content: {type: String}, //内容
    createDate: {type: Date} //创建时间
});

module.exports = mongoose.model('Article', ArticleSchema);