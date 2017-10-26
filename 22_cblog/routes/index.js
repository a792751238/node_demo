/**
 * Created by easterCat on 2017/10/18.
 */


module.exports = function (app) {
    app.get('/', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.sendFile(config.publicPath + '/index.html');
    });
    app.use('/home', require('./router.home'));
    app.use('/file', require('./router.file'));
    app.use('/user', require('./router.user'));
    app.use('/comment', require('./router.comment'));
};