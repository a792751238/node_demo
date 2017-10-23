/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();

const {
    createArticle,
    getAllArticles,
    getOneArticleById,
    deleteOneArticleById
} = require('../lib/model/article.model');

// POST /createArticle 创建一篇新文章
router.post('/createArticle', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

    let article = {
        title: title,
        content: content
    };

    createArticle(article);
    res.send(article);
});

// GET /articles 获取分页的文章
router.get('/articles', (req, res) => {
    let where = req.query.where;
    where = JSON.parse(where);
    getAllArticles(where, res);
});

// GET  /article/:id 获取相应id号的文章
router.get('/article/:articleid', (req, res) => {
    let id = req.params.articleid;
    getOneArticleById(res, id);
});

router.delete('/article/:articleid', (req, res) => {
    let id = req.params.articleid;
    deleteOneArticleById(res, id);
});

module.exports = router;