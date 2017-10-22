const Article = require('mongoose').model('Article');

module.exports = {
    create: function(article, callback) {
        Article.create(article, callback);
    }

};