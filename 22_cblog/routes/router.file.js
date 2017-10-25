/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    dest: path.join(__dirname, '/upload/picture')
});


const {getPicAndSaved} = require('../lib/model/file.model');

router.get('/picture', (req, res) => {
    res.send('hello, picture');
});

router.post('/picture', upload.single('avatar'), (req, res) => {
    let pic = {
        name: req.file.originalname,
        path: req.file.destination,
        size: req.file.size,
        type: req.file.mimetype,
    };
    getPicAndSaved(pic)
        .then((result) => {
            res.send(result);
        });
});

module.exports = router;