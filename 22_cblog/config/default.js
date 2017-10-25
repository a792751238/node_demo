module.exports = {
    port: 3003,
    session: {
        secret: 'cblog',
        key: 'cblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/cblog'
};