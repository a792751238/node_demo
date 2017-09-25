/**
 * Created by easterCat on 2017/9/25.
 */

var config = {
    port: 3000,
    session: {
        secret: 'myblog',
        key: 'myblog',
        maxAge: '2592000000'
    },
    mongodb: 'mongodb://localhost:27017/myblog'
};

module.exports = config;
