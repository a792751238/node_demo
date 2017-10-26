/**
 * Created by easterCat on 2017/10/26.
 */
const express = require('express');
const router = express.Router();

const {
    createComment,
    getCommentsById,
    delCommentById
} = require('../lib/model/comment.model');

router.post('/', (req, res) => {
    let author = req.body.author;
    let content = req.body.content;
    let articleid = req.body.articleid;

    let comment = {
        author: author,
        content: content,
        articleid: articleid,
        createDate: Date.now()
    };
    createComment(comment)
        .then((result) => {
            res.send(result);
        })

});

router.get('/:articleid', (req, res) => {
    let articleid = req.params.articleid;

    getCommentsById(articleid)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

router.delete('/:articleid', (req, res) => {
    let articleid = req.params.articleid;

    delCommentById(articleid)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;