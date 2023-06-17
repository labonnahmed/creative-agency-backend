const mongoose = require('mongoose');

const contactSchema = mongoose.Schema([{
    name: {
        type: String,
    },
    email: {
        type: String
    },
    massage: {
        type: String
    }
}]);

const ContactModel = mongoose.model('contact', contactSchema);

module.exports = ContactModel;