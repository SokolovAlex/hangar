var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var config = require('./config');
var passport = require('passport');
var morgan = require('morgan');
var session = require('express-session');
var boot = require('./boot');

boot(app, passport);

var auth = require('./routes/auth');
var pages = require('./routes/pages');
var api = require('./routes/api');
var upload = require('./routes/upload');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());

auth(app, passport);
app.use('/', pages(app));
app.use('/api', api(app));
app.use('/upload', upload(app));

app.config = config;
app.upload_path = __dirname + '/../upload/';

app.set('view engine', 'jade');
app.set('views', __dirname + '/../build/views');

app.use(express.static(__dirname + '/../build'));
app.use('/upload', express.static(__dirname + '/../upload'));

var isProd = process.env.NODE_ENV === "prod";
var port = isProd ? 80 : 1111;

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
});