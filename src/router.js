const router = require('express').Router();
const homePage = require('./controllers/homePage.js');
const otherPages = require('./controllers/otherPages.js');

router.use(homePage);
router.use(otherPages);

module.exports = router;