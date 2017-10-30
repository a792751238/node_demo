/**
 * Created by easterCat on 2017/10/26.
 */
module.exports = {
    createComment,
    getCommentsById,
    delCommentById
};

const CommentModel = require('../schema/comment.schema');

function createComment(comment) {
    return CommentModel
        .create(comment);
}

function getCommentsById(articleid) {
    return CommentModel
        .find({articleid: articleid})
        .sort({_id: 1})
        .exec();
}

function delCommentById(commentid) {
    return CommentModel
        .findByIdAndRemove(commentid)
        .exec();
}

function getCommentCount(articleid) {
    return CommentModel
        .count({articleid: articleid})
        .exec();
}