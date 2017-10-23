/**
 * Created by easterCat on 2017/10/19.
 */
module.exports = {
    createArticle,
    getAllArticles,
    getOneArticleById,
    deleteOneArticleById
};

const ArticleModel = require('../schema/article.schema');

//创建一篇文章
function createArticle(data) {
    let article = {
        title: data.title,
        content: data.content,
        createDate: new Date()
    };
    return ArticleModel
        .create(article);
}

//获取所有的文章
function getAllArticles(where, res) {
    let pageSize = 10;                   //一页多少条
    let currentPage = where.currentPage;                //当前第几页
    let sort = {'createDate': -1};        //排序（按创建时间倒序）
    let condition = {};                 //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    return ArticleModel
        .find(condition)
        .skip(skipnum)
        .limit(pageSize)
        .sort(sort)
        .exec();
}

//通过id获取一篇文章
function getOneArticleById(article_id) {
    return ArticleModel
        .findOne({_id: article_id})
        .exec();
}

//通过id删除一篇文章
function deleteOneArticleById(id) {
    return ArticleModel
        .remove({_id: id})
        .exec();
}
