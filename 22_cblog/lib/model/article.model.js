/**
 * Created by easterCat on 2017/10/19.
 */
module.exports = {
    createArticle,
    getAllArticles,
    getOneArticleById
};

const ArticleModel = require('../schema/article.schema');

function createArticle(data) {
    let article = new ArticleModel({
        title: data.title,
        content: data.content,
        createDate: new Date()
    });

    article.save((error, result) => {
        if (error) {
            console.log('article insert error:' + error);
        } else {
            console.log('article insert success' + result);
        }
    });
}

function getAllArticles(res) {
    ArticleModel.find({}, null, (error, result) => {
        if (error) {
            console.log("Error:" + error);
        } else {
            console.log("getAllArticles:" + result);
            res.send(result);
        }
    });
}

function getOneArticleById(res, id) {
    ArticleModel.findById(id, (error, result) => {
        if (error) {
            console.log("Error:" + error);
        } else {
            console.log("getOneArticleById:" + result);
            res.send(result);
        }
    });
}
