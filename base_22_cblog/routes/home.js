/**
 * Created by easterCat on 2017/10/18.
 */
const express = require('express');
const router = express.Router();

router.get('/content2', (req, res) => {
    console.log('hello wrold');
});

module.exports = router;