const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const User = require('./../models/users');
const passport = require('./../middlewares/passport');

router.post('/register', function (req, res, next) {
    try {
        logger.info(`POST users/`);

        var newUser = new User();

        newUser.local.login = req.body.login;                
        newUser.local.password = req.body.password; 

        newUser.save(function (err) {
            if (err) {
                logger.error(`User registred failed`);
                throw new Error('User registred failed');
            }

            logger.info(`User registred successfully`); 
            res.send('OK');
        });

    } catch (err) {
        next(err);
    }
});

router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        res.send(req.user);
    }
);

router.get('/logout',
    function (req, res) {
        req.logout();
        res.send('OK');
    }
);

module.exports = router;
