/**
 * Created by easterCat on 2017/10/19.
 */
module.exports = {
    createArticle,
    getAllArticles
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

function getAllArticles(response) {
    ArticleModel.find({}, null, (error, result) => {
        if (error) {
            console.log("Error:" + error);
        } else {
            console.log("Res:" + result);
            response.send(result);
        }
    });
}

