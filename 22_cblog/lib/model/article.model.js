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
    let article = new ArticleModel({
        title: data.title,
        content: data.content,
        createDate: new Date()
    });

    article.save((error, result) => {
        if (error) {
            console.log('article insert error:' + error);
        } else {
            // console.log('article insert success' + result);
        }
    });
}

//获取所有的文章
function getAllArticles(where, res) {
    console.log(where);
    let pageSize = 10;                   //一页多少条
    let currentPage = where.currentPage;                //当前第几页
    let sort = {'createDate': -1};        //排序（按创建时间倒序）
    let condition = {};                 //条件
    let skipnum = (currentPage - 1) * pageSize;   //跳过数

    ArticleModel
        .find(condition)
        .skip(skipnum)
        .limit(pageSize)
        .sort(sort)
        .exec((error, result) => {
            if (error) {
                console.log("Error:" + error);
            } else {
                // console.log("getAllArticles:" + result);
                res.send(result);
            }
        });
    // ArticleModel.find({}, null, (error, result) => {
    //     if (error) {
    //         console.log("Error:" + error);
    //     } else {
    //         console.log("getAllArticles:" + result);
    //         res.send(result);
    //     }
    // });
}

//通过id获取一篇文章
function getOneArticleById(res, id) {
    ArticleModel.findById(id, (error, result) => {
        if (error) {
            console.log("Error:" + error);
        } else {
            // console.log("getOneArticleById:" + result);
            res.send(result);
        }
    });
}

//通过id删除一篇文章
function deleteOneArticleById(res, id) {
    let wherestr = {'_id': id};
    ArticleModel.findByIdAndRemove(id, {}, (error, result) => {
        if (error) {
            console.log('error', error);
        }
        else {
            console.log(result)
            res.send(result);
        }
    });
};
