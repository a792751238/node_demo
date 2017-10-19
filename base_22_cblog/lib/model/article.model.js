/**
 * Created by easterCat on 2017/10/19.
 */
module.exports = {
    insert
};

const Article = require('../schema/article.schema');

function insert(data) {
    let article = new Article({
        title: data.title,
        content: data.content,
        createDate: new Date()
    });

    article.save((err, res) => {
        if (err) {
            console.log('article insert error:' + err);
        } else {
            console.log('article insert success' + res);
        }
    });
};

