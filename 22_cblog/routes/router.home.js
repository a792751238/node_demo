/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();
const {contentsToMarked, contentToMarked} = require('../utils/marked');

const {
    createArticle,
    getAllArticles,
    getOneArticleById,
    delOneArticleById,
    getAllArticlesCount
} = require('../lib/model/article.model');

// POST /createArticle 创建一篇新文章
router.post('/createArticle', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

    let article = {
        title: title,
        content: content
    };
    createArticle(article).then((result) => {
        res.send(result);
    });
});

// GET /articles 获取分页的文章
router.get('/articles/:page', (req, res) => {
    let page = req.params.page;
    // where = JSON.parse(where);
    getAllArticles(page)
        .then((results) => {
            getAllArticlesCount().then((num) => {
                let obj = {
                    count: num
                };
                Object.assign(results, obj);
                results = contentsToMarked(results);
                res.send(results);
            });
        });
});

// GET  /article/:id 获取相应id号的文章
router.get('/article/:articleid', (req, res) => {
    let id = req.params.articleid;
    getOneArticleById(id)
        .then((result) => {
            result = contentToMarked(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

// DELETE /article/:articleid 通过id删除一篇文章
router.delete('/article/:articleid', (req, res) => {
    let id = req.params.articleid;
    delOneArticleById(id).then((result) => {
        res.send(result);
    });
});

module.exports = router;