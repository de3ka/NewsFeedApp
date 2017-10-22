let articles = require('../data/articles'),
    Article = require('mongoose').model('Article'),
    config = require('../config/database');

let CONTROLLER_NAME = 'articles';

function createArticle(req, res) {
    let newArticle = req.body;
    Article.create(newArticle).then(res.send(newArticle));
}

function getAllArticles(req, res) {
    Article.find({}, function(err, articles) {
        if (err) {
            throw err;
        }
        if (!articles.length) {
            res.status(401).send({
                err: 'No articles.'
            });
        } else {
            res.status(200).json(articles);
        }
    });
}

function getAllLatestFiveArticles(req, res) {
    Article.find({})
        .sort({ 'date': -1 })
        .limit(5)
        .exec(function(err, articles) {
            if (err) {
                throw err;
            }
            if (!articles.length) {
                res.status(401).send({
                    err: 'No articles.'
                });
            } else {
                res.status(200).json(articles);
            }
        });
}

function getArticleById(req, res) {
    let id = req.body.id;
    Article.find({
        _id: id
    }, function(err, articles) {
        if (err) {
            throw err;
        }

        if (!articles.length) {
            res.status(401).send({
                err: 'No Articles.'
            });
        } else {
            res.status(200).json(articles[0]);
        }
    });
}

function addCommentToArticle(req, res) {
    let title = req.params.title;

    let comment = {
        postedBy: req.body.postedBy,
        content: req.body.content
    };

    Article.find({ title: title }, function(err, articles) {
        if (!articles)
            throw Error('Could not load Document');
        else {
            console.log(articles[0].comments);
            articles[0].comments.push(comment);
            articles[0].save().then(res.send(articles[0]));
        }
    });
}

function getArticleByTitle(req, res) {
    let title = req.params.title;
    Article.find({
        title: title
    }, function(err, articles) {
        if (err) {
            throw err;
        }

        if (!articles.length) {
            res.status(401).send({
                err: 'No articles.'
            });
        } else {
            res.status(200).json(articles[0]);
        }
    });
}

function updateArticle(req, res) {
    Article.findById(req.body._id, function(err, article) {
        if (!article)
            throw Error('Could not load Document');
        else {
            article.title = req.body.title;
            article.content = req.body.content;
            article.image = req.body.image;
            article.category = req.body.category;
            article.videoUrl = req.body.videoUrl;
            article.save().then(res.send(article));
        }
    });
}

function deleteArticle(req, res) {
    Article.findOneAndRemove({ _id: req.params._id }).then(res.send({}));
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    addCommentToArticle,
    getArticleByTitle,
    updateArticle,
    deleteArticle,
    getAllLatestFiveArticles
};