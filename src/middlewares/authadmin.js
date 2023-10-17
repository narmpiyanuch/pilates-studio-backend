module.exports = async (req, res, next) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return next(createError('unauthenticated', 401))
        }
        next();
    } catch (err) {
        next(err)
    }
};