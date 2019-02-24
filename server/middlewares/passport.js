const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, login, password, done) {

        User.findOne({ 'local.login' :  login }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false); 
            }

            if (!user.validPassword(password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

passport.use(new FacebookStrategy({
    clientID: '423187595105850',
    clientSecret: '9138de8b49a1db1c59dec3a32db7c4da',
    callbackURL: '/auth/facebook/return'
},
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {

            User.findOne({ 'facebook.id': profile.id }, function (err, user) {

                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user); 
                } else {
                    var newUser = new User();

                    newUser.facebook.id = profile.id;                
                    newUser.facebook.token = token;                   
                    newUser.facebook.name = profile.displayName; 

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }

            });
        });
    }

));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;