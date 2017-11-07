/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();

router.post('/createArticle', addOneArticle);
router.get('/articles/:page', getPageArticle);
router.get('/article/:articleid', getOneArticle);
router.delete('/article/:articleid', deleteOneArticle);

const {marked} = require('../utils');

const {
    createArticle,
    getAllArticles,
    getOneArticleById,
    delOneArticleById,
    getAllArticlesCount,
    increasePV
} = require('../lib/model/article.model');

const {
    delCommentsById
} = require('../lib/model/comment.model');

// POST /createArticle 创建一篇新文章
function addOneArticle(req, res) {
    let title = req.body.title;
    let content = req.body.content;

    let article = {
        title: title,
        content: content
    };

    let back = createArticle(article);
    res.send(back);
    // createArticle(article).then((result) => {
    //     result = marked.contentToMarked(result);
    //     res.send(result);
    // });
}

// GET /articles 获取分页的文章
function getPageArticle(req, res) {
    let page = req.params.page;
    getAllArticles(page)
        .then((results) => {
            //再获取分页所有的文章之后，再获取所有文章的总数
            getAllArticlesCount().then((num) => {
                results = marked.contentsToMarked(results);
                let obj = {
                    articles: results,
                    count: num
                };
                res.send(obj);
            });
        });
}


// GET  /article/:id 获取相应id号的文章
function getOneArticle(req, res) {
    let id = req.params.articleid;

    getOneArticleById(id)
        .then((result) => {
            result = marked.contentToMarked(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}

// DELETE /article/:articleid 通过id删除一篇文章
function deleteOneArticle(req, res) {
    let id = req.params.articleid;
    delOneArticleById(id).then((result) => {
        //删除文章后将文章下的留言也一并删除
        delCommentsById(result._id);
        res.send(result);
    });
}

module.exports = router;