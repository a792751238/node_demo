/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();

const {insert} = require('../lib/model/article.model');

router.get('/content02', (req, res) => {
    let article = {
        title: '我我爱睡觉懂爱四季豆爱上京东鞍山23',
        content: '啊实打实大苏打'
    };
    res.send_data(article);
});

router.post('/content02', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;

    let article = {
        title: title,
        content: content
    };

    insert(article);
    res.send(article);
});

module.exports = router;