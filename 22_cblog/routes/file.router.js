/**
 * Created by easterCat on 2017/10/25.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const {uploadPath} = require('../app.config');

const upload = multer({
    dest: uploadPath
});

const {getPicAndSaved, findPicById, findPic} = require('../lib/model/file.model');

//通过id返回一张图片
router.get('/picture/:pic_id', (req, res) => {
    let id = req.params.pic_id;

    if (id) {
        findPicById(id)
            .then((result) => {
                let pic_path = path.join(result.path, result.filename);
                fs.readFile(pic_path, 'binary', (error, file) => {
                    if (error) {
                        res.send(error);
                    } else {
                        res.writeHead(200, {'Content-Type': 'image/jpeg'});
                        res.write(file, 'binary');
                        res.end();
                    }
                });
            })
    } else {
        res.send("can't get the id");
    }

});

//上传一张图片并且保存在upload文件夹中
router.post('/picture', upload.single('avatar'), (req, res) => {
    let pic = {};
    pic.name = req.file.originalname;
    pic.filename = req.file.filename;
    pic.path = req.file.destination;
    pic.size = req.file.size;
    pic.type = req.file.mimetype;


    getPicAndSaved(pic)
        .then(result => {
            res.send(result);
        });


});

module.exports = router;