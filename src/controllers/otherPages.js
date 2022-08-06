const router = require('express').Router();
const api = require('../service/furniture.js');
const { errorMapper } = require('../utils/errorMapper.js');
const { furnitureValidator } = require('../utils/FurnitureValidator.js');
const { createUser, getUser, logout } = require('../service/user.js');
const { sessionName, blackList } = require('../constants.js');
const { preload } = require('../middleware/preload.js');
const { isOwner, isAuth } = require('../middleware/guards.js');

// register page collector
router.post('/user/register', async (req, res) => {
    try {
        let creation = await createUser(req.body);
        res.cookie(sessionName, creation.accessToken, { httpOnly: true });
        res.status(201).json(creation);
    } catch (error) {
        errorMapper(error);
        res.status(404).json(error);
    };
});

// login page collector
router.post('/user/login', async (req, res) => {
    try {
        let login = await getUser(req.body);
        res.cookie(sessionName, login.accessToken, { httpOnly: true });
        res.json(login);
    } catch (error) {
        errorMapper(error);
        res.status(404).json(error);
    };
});

// get current user posts
router.get('/my-posts', isAuth(), async (req, res) => {
    res.json(await api.getAllFromSpecificOwner(req.user._id));
});

// edit page collector
router.get('/details/:id', preload(), (req, res) => {
    res.json(res.locals.item);
});

// edit page collector
router.put('/edit-trip/:id', preload(), isOwner(), async (req, res) => {
    try {
        let editValidator = furnitureValidator(req.body);
        let editedTrip = await api.editOne(req.params.id, editValidator);
        res.json(editedTrip);
    } catch (error) {
        const message = errorMapper(error);
        res.status(404).json({ message });
    }
});

// delete page collector
router.delete('/delete-trip/:id', preload(), isOwner(), async (req, res) => {
    try {
        let deleted = await api.deleteOne(req.params.id);
        res.json(deleted);
    } catch (error) {
        const message = errorMapper(error);
        res.status(404).json({ message })
    }
});

// like page controller
router.post('/like/:id', isAuth(), async (req, res) => {
    try {
        let like = await api.likeOne(req.params.id, req.body._id);
        res.json(like);
    } catch (err) {
        const message = errorMapper(error);
        res.status(404).json({ message })
    }
});

// dislike page controller
router.post('/dislike/:id', preload(), isAuth(), async (req, res) => {
    const userId = req.body._id;
    try {
        let like = await api.dislikeOne(req.params.id, userId);
        res.json(like);
    } catch (err) {
        const message = errorMapper(error);
        res.status(404).json({ message })
    }
})

// logout page controller
router.get('/user/logout', (req, res) => {
    logout(req.user.token);
    res.status(204).end();
});

module.exports = router;