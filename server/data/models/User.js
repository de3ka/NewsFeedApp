const mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    requiredMessage = '{PATH} is required';

module.exports.init = function() {
    let userSchema = mongoose.Schema({
        username: {
            type: String,
            required: requiredMessage,
            unique: true,
            minlength: 4,
            maxlength: 30
        },
        salt: String,
        hashPass: String,
        email: {
            type: String,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
            require: requiredMessage
        }
    });

    userSchema.method({
        authenticate: function(password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else {
                return false;
            }
        }
    });

    let User = mongoose.model('User', userSchema);
};