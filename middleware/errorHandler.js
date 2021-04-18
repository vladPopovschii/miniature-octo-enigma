module.exports = function errorHandlerMiddleware(err, req, res, next) {
    if (!err) return next();

    if (err.message === "Only image files are allowed!")
        return res.status(400).json({ message: err.message });
};
