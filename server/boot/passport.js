var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');

module.exports = (app, passport) => {

    var User = app.models.User;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.find(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new GoogleStrategy(

        config.auth.google,

        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ where: { googleid: profile.id } }, function(err, user) {
                    if (err)
                        return done(err);

                    console.log("_______user__________", user);

                    if (user) {
                        return done(null, user);
                    } else {
                        User.create({
                            googleid: profile.id,
                            email: profile.emails[0].value,
                            name: profile.displayName,
                            googleToken: accessToken,
                            avatar: profile.photos[0].value
                        }, (err, result) => {
                            if (err) done(err);
                            return done(null, result);
                        });
                    }
                });
            });
        }));
};