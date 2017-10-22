const mongoose = require('mongoose'),
    dateFormat = require('dateformat'),
    requiredMessage = '{PATH} is required';

module.exports.init = function() {
    let articleSchema = mongoose.Schema({
        title: {
            type: String,
            requred: requiredMessage
        },
        content: {
            type: String
        },
        image: {
            type: String
        },
        category: {
            type: String,
            default: "Common"
        },
        postedBy: {
            type: String
        },
        postedOn: {
            type: String,
            default: dateFormat("mmm d")
        },
        comments: [{
            postedBy: String,
            content: String
        }]
    });

    let Article = mongoose.model('Article', articleSchema);
};