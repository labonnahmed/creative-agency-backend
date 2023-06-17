const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema([{
    category: {
        type: String
    },
    description: {
        type: String
    },
    img:{
        type: String
    }
}]);

const ServiceModel = mongoose.model('service', serviceSchema);

module.exports = ServiceModel;