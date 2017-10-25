/**
 * Created by easterCat on 2017/10/25.
 */
module.exports = {
    getPicAndSaved,
    findPicById
};

const PictureModel = require('../schema/file.schema');

//接收上传的图片并且保存
function getPicAndSaved(data) {
    let pic = {
        name: data.name,
        path: data.path,
        filename:data.filename,
        size: data.size,
        type: data.type,
        uploadDate: new Date()
    };

    return PictureModel.create(pic);
}

//通过id查找一张图片
function findPicById (id) {
    return PictureModel.findById(id).exec();
}