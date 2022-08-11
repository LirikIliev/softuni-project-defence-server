const router = require('express').Router();
const api = require('../service/Furniture.js');

// home page controller
router.get('/', async (req, res) => {
    res.json(await api.getSortedByDate());
});

// all post page
router.get('/all-posts', async (req, res) => {
    res.json(await api.getAll());
});

module.exports = router;