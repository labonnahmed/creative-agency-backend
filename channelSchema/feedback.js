const mongoose = require('mongoose');

const feedSchema = mongoose.Schema([{
    clientName: {
        type: String,
    },
    profession: {
        type: String
    },
    feedback: {
        type: String
    }
}]);

const FeedbackModel = mongoose.model('feedback', feedSchema);

module.exports = FeedbackModel;