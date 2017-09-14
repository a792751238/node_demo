const crypto = require('crypto');

class util {
    static isNull(str) {
        if (str.trim() == null || str.trim() == '') {
            //为空  
            return true;
        }
    }

    //密码加密混淆  
    static mix(str) {
        let sha1 = crypto.createHash('sha1');
        return sha1.update(str).digest('hex');
    }

    //字符串是否相等  
    static isEqual(str, str2) {
        if (str.trim() === str2.trim()) {
            return true;
        }
    }

    //未登录 1   
    static notLogin (req, res) {
        if (!req.session.user) {
            req.flash('isLogin', '1');
            res.redirect('/login');
            return true;
        }
        return false;
    }

    //已经登录 0   
    static login(req, res) {
        if (req.session.user) {
            if (req.session.user['_id'] === req.params._id) {
                req.flash('isLogin', '0');
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    //json里出去空值
    static mergeJson(basedata, newdata) {
        let merge = {};

        for (let key1 in basedata) {
            merge[key1] = basedata[key1];
        }
        for (let key in newdata) {
            if (newdata[key] !== '' && newdata !== null) {
                merge[key] = newdata[key];
            }
        }
        return merge;
    }

    //字符串
    static isString(str) {
        if (typeof str === 'string' && str.constructor === String) return true;
    }

    //图片路径
    static getPath(str, aim) {
        var reg = new RegExp(aim + '\\/(\\S*)');
        return str.match(reg)[1];
    }

    //时间格式化
    static format(str, mat) {
        let d, date = new Date(str),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        switch (mat) {
            case 'year':
                d = year
                break;
            case 'month':
                d = month;
                break
            case 'day':
                d = day;
            default:
                d = year + '-' + month + '-' + day;
        }
        return d;
    }

}

module.exports = util;