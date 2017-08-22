/**
 * Created by easterCat on 2017/8/22.
 */

const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

let handle = {};

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);