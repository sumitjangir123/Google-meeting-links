const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

clientID = "747537762268-71s6k9jo0afad2p0a55ba8li85j0i5s0.apps.googleusercontent.com"
clientSecret="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"

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "http://localhost:8000/auth/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log("refreshToken : ",refreshToken)
        return cb();
    }
));

app.get('/auth/callback',
    passport.authenticate('google', { failureRedirect: '/' })
);

app.get('/auth',
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
