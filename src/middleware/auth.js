const { verifyToken } = require("../service/token")

exports.auth = (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        try {
            const payload = verifyToken(token);
            req.user = {
                email: payload.email,
                _id: payload._id,
                token,
            };

        } catch (err) {
            return res.status(401).json({ message: "Invalid access token. Please login!" })
        }
    }
    next()
}