/**
 * Created by easterCat on 2017/10/26.
 */
const express = require('express');
const router = express.Router();
const {contentsToMarked, contentToMarked} = require('../utils/marked');

const {
    createComment,
    getCommentsById,
    delCommentById
} = require('../lib/model/comment.model');

//创建一条留言
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
            result = contentToMarked(result);
            res.send(result);
        })
});

//通过文章id查找所有的留言
router.get('/:articleid', (req, res) => {
    let articleid = req.params.articleid;

    getCommentsById(articleid)
        .then((result) => {
            result = contentsToMarked(result);
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

//通过留言id，删除一条留言
router.delete('/:commentid', (req, res) => {
    let commentid = req.params.commentid;

    delCommentById(commentid)
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
        });
});

module.exports = router;