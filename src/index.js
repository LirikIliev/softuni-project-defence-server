const express = require('express');
const app = express();
const { port } = require('./constants.js');
const router = require('./router.js');
const { headers } = require('./middleware/cors.js');
const cookie = require('cookie-parser');
const { auth } = require('./middleware/auth.js');

const mongoose = require('./config/mongooseDB.js')
    .then((dataBase) => {
        console.log('Database is connected!');
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }).catch(error => {
        console.log(error);
    });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(headers);
app.use(auth);
app.use(router);
// app.use(cookie);