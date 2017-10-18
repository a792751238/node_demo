/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();
const config = require('../app.config');

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(config.publicPath + '/index.html');
});

module.exports = router;