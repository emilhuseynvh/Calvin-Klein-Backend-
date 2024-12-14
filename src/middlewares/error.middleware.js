const errorMiddleware = (err, req, res, next) => {
    if (err.statusCode === 500 || !err.statusCode) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(err.statusCode).json({ error: err.message });
}

module.exports = errorMiddleware;