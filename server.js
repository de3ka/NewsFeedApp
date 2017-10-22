const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./server/config/database'), // get db config file
    User = require('./server/data/models/User'), // get the mongoose model
    port = process.env.PORT || 3000,
    jwt = require('jwt-simple');

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    next();
});

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());

// demo Route (GET http://localhost:3000)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// connect to database
mongoose.connect(config.database);
let UserModel = require('./server/data/models/User');
let ArticleModel = require('./server/data/models/Article');
UserModel.init();
ArticleModel.init();

// pass passport for configuration
require('./server/config/passport')(passport);

// bundle our routes
var apiRoutes = express.Router();

let usersController = require('./server/controllers/UsersController');
let articlesController = require('./server/controllers/ArticlesController');

// create a new user account (POST http://localhost:3000/api/signup)
apiRoutes.post('/signup', usersController.postRegister);
apiRoutes.post('/authenticate', usersController.postAuthenticate);
apiRoutes.get('/users', usersController.getAll);
apiRoutes.get('/users/:username', usersController.getByUsername);
apiRoutes.put('/users/:username', usersController.updateUser);
apiRoutes.delete('/users/:username', usersController.deleteUser);

apiRoutes.get('/articles', articlesController.getAllLatestFiveArticles);
apiRoutes.get('/articles/:title', articlesController.getArticleByTitle);
apiRoutes.post('/articles/:title', articlesController.addCommentToArticle);
apiRoutes.post('/articles', articlesController.createArticle);
apiRoutes.put('/articles', articlesController.updateArticle);
apiRoutes.delete('/articles/:id', articlesController.deleteArticle);


// connect the api routes under /api/*
app.use('/api', apiRoutes);

// Start the server
app.listen(port);
console.log('Server is running at: http://localhost:' + port);