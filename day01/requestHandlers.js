/**
 * Created by easterCat on 2017/8/22.
 */


function start() {
    console.log(`request handler 'start' was called`);
}

function upload() {
    console.log(`request handler 'upload' was called`);
}

exports.start = start;
exports.upload = upload;