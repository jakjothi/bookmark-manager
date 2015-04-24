'use strict';

module.exports = function(errors, res, next) {
    if (!errors.length) {
        next();
    } else {
        res.sendBadRequest(errors);
    }
};
