
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => {
            res.status(500).json({
                status: "error",
                message: "Server error",
                error: err.message
            });
        });
    };
};