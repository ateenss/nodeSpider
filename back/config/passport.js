let passport = require('passport');
let LocalStategy = require('passport-local').Strategy;

let  db = require ('../config/db.js');

const User = db.User;

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});

passport.use(new LocalStategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    User.findOne({
        attributes: [
            'id', 'username'
        ],
        where: {
            username: username
        }
    }).then(function(user) {
        if (!user) {
            return done(null, false, {message: 'Email does not exist'});
        }
        return done(null, user.get());
    }).catch(function() {
        return done(null, false);
    });
}));