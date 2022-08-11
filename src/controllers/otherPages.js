const router = require('express').Router();
const apiTrip = require('../service/furniture.js');
const apiComment = require('../service/comment.js');
const { errorMapper } = require('../utils/errorMapper.js');
const { tripValidator } = require('../utils/tripValidator.js');
const { createUser, getUser, logout } = require('../service/user.js');
const { sessionName, blackList } = require('../constants.js');
const { preload } = require('../middleware/preload.js');
const { isOwner, isAuth } = require('../middleware/guards.js');
const { userValidator } = require('../utils/userValidator.js');


// create trip controller
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
        const result = await apiTrip.create(validateData);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    };
});

// get all comments for current post
router.get('/details/:id/get-all-comments', async (req, res) => {
    try {
        const result = await apiComment.getAll(req.params.id);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    }
});

// create comment collector
router.post('/details/:id/create-comment', isAuth(), async (req, res) => {
    let comment = {
        fullName: req.user.fullName,
        text: req.body.text,
        _tripId: req.params.id,
        _ownerId: req.user._id,
    };
    try {
        // const commentValidate = ""
        const result = await apiComment.create(comment);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    }
});

// like comment
router.post('/details/:id/like-comment', isAuth(), async (req, res) => {
    try {
        const result = await apiComment.likeOne(req.params.id, req.user._id);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    }
});

// dislike comment
router.post('/details/:id/dislike-comment', isAuth(), async (req, res) => {
    try {
        const result = await apiComment.dislikeOne(req.params.id, req.user._id);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    };
});

// delete comment
router.delete('/details/:id/delete-comment', isAuth(), async (req, res) => {
    try {
        const result = await apiComment.deleteOne(req.params.id);
        res.status(201).json(result);
    } catch (error) {
        let message = errorMapper(error);
        res.status(400).json({ message });
    };
});

// register trip collector
router.post('/user/register', async (req, res) => {
    const validator = userValidator(req.body);
    try {
        let creation = await createUser(validator);
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
    res.json(await apiTrip.getAllFromSpecificOwner(req.user._id));
});

// edit trip collector
router.get('/details/:id', preload(), (req, res) => {
    res.json(res.locals.item);
});

// edit trip collector
router.put('/edit-trip/:id', preload(), isOwner(), async (req, res) => {
    try {
        let editValidator = tripValidator(req.body);
        let editedTrip = await apiTrip.editOne(req.params.id, editValidator);
        res.json(editedTrip);
    } catch (error) {
        const message = errorMapper(error);
        res.status(404).json({ message });
    }
});

// delete trip collector
router.delete('/delete-trip/:id', preload(), isOwner(), async (req, res) => {
    try {
        let deleted = await apiTrip.deleteOne(req.params.id);
        res.json(deleted);
    } catch (error) {
        const message = errorMapper(error);
        res.status(404).json({ message })
    }
});

// like trip controller
router.post('/like/:id', isAuth(), async (req, res) => {
    try {
        let like = await apiTrip.likeOne(req.params.id, req.body._id);
        res.json(like);
    } catch (err) {
        const message = errorMapper(error);
        res.status(404).json({ message })
    }
});

// dislike trip controller
router.post('/dislike/:id', preload(), isAuth(), async (req, res) => {
    const userId = req.body._id;
    try {
        let like = await apiTrip.dislikeOne(req.params.id, userId);
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