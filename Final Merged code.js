const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Meeting = require('google-meet-api').meet;


clientID = "781499400321-u34k6mri6862184l44ub6k5jhqqg5p7a.apps.googleusercontent.com"
clientSecret="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"

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:8000/auth/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        Meeting({
            clientId: clientID,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
            date: "2020-12-01",
            time: "10:59",
            summary: 'summary',
            location: 'location',
            description: 'description',
            checking:0
        }).then(function (result) {
            console.log(result);
        }).catch((error) => {
            console.log(error)
        });
        return cb();
    }
));

app.get('/auth/callback',
    passport.authenticate('google', { failureRedirect: '/' })
);

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile','https://www.googleapis.com/auth/calendar'],
        accessType: 'offline',
        prompt: 'consent'
    }
    ));

app.get('/',function(req,res){
    res.send("done")
})

app.listen(port, function (err) {
    if (err) {
        console.log('something wrong in starting server !!!');
        return;
    }
    return console.log("server is up and running on port ", port);
});
