// require the library
const express = require("express");
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const app = express();
const PORT = 10000;
// require passport
const passport = require('passport');
// require passport local stretegy 
const LocalStretegy = require('./config/passport_local_stretegy');
// require google stretegy
const googleStretegy = require('./config/passport-google-oauth2-stretegy');
// require session
const session = require('express-session');
// require connect flash
const flash = require('connect-flash');
// require custom middleware
const customMiddleware = require('./config/middleware')

app.use(expresslayouts);
// assets
app.use(express.static('./assets'));
// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractStyles", true);
app.set('layout extractScript', true);

// middelware to parse the form data
app.use(express.urlencoded({ extended: true }));

// sessions 
app.use(session({
    name: "nodeja auth",
    secret: 'balasomthing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// use passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setflash);
// use express router
app.use('/', require('./routes'));

// listen to the port
app.listen(PORT, () => {
    console.log('The App is Listening on Port', PORT);
})