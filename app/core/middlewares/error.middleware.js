'use strict';

module.exports = function(app) {
    app.use(function(req, res) {
        res.sendRequestUriNotFound();
    });

    app.use(function(err, req, res, next) {
        var code,
            message;

        code = err.status || 500;
        message = err.message || err;

        res
            .status(code)
            .json({
                status: 'error',
                code: parseInt(code),
                message: message
            });
    });
};
