exports.isAuth = () => (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: "Please login first!" })
    };
};

exports.isOwner = () => (req, res, next) => {
    if (!req.user) {
        res.status(401).json({ message: "Please login first!" })
    } else if (req.user._id == res.locals.item._ownerId) {
        next();
    }
    else {
        res.status(403).json({ message: "You can't modify this record!" })
    };
};