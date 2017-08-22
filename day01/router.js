/**
 * Created by easterCat on 2017/8/22.
 */
function route(handle, pathname) {
    console.log(`About route a request on ${pathname}`);
    let func = handle[pathname];
    if (typeof func === 'function') {
        func();
    } else {
        console.log(`No request handler has be found for ${pathname}`)
    }
}

exports.route = route;