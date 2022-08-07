const router = require('express').Router();
const api = require('../service/Furniture.js');
const { errorMapper } = require('../utils/errorMapper.js');
const { tripValidator } = require('../utils/tripValidator.js');
const { isAuth } = require('../middleware/guards.js');

// home page controller
router.get('/', async (req, res) => {
    res.json(await api.getSortedByDate());
});

// all post page
router.get('/all-posts', async (req, res) => {
    res.json(await api.getAll());
});

// create page controller
router.post('/create-trip', isAuth(), async (req, res) => {
    let trip = {
        author: req.body.author,
        country: req.body.country,
        destination: req.body.destination,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        _ownerId: req.user._id,
    };
    try {
        const validateData = tripValidator(trip);
        const result = await api.create(validateData);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    };
});

module.exports = router;