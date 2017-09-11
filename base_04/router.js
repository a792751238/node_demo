/**
 * Created by easterCat on 2017/9/6.
 */
module.exports = {
    login: (request, response) => {
        console.log('login');
        response.write('login');
    },
    register: (request, response) => {
        console.log('register');
        response.write('register');
    }
};

