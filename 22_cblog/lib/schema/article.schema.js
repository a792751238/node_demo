/**
 * Created by easterCat on 2017/10/19.
 */

const mongoose = require('../db');

const Schema = mongoose.Schema;

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
    } //创建时间
});


const ArticleModel = mongoose.model('Article', ArticleSchema);//将Schema发布为Model

module.exports = ArticleModel;