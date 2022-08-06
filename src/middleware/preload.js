const { getOne } = require('../service/furniture.js')
exports.preload = () => async (req, res, next) => {
    const id = req.params.id;
    try {
        const item = await getOne(id);
        res.locals.item = item;
        next();
    } catch (error) {
        res.status(404).json({ message: 'item has not been found!' });
    };
}