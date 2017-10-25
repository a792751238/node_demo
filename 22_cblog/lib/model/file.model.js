/**
 * Created by easterCat on 2017/10/25.
 */
module.exports = {
    getPicAndSaved
};

const PictureModel = require('../schema/file.schema');

//接收上传的图片并且保存
function getPicAndSaved(data) {
    let pic = {
        name: data.name,
        path: data.path,
        size: data.size,
        type: data.type,
        uploadDate: new Date()
    };

    return PictureModel.create(pic);
}