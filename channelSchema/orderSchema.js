const mongoose = require('mongoose');

const orderSchema = mongoose.Schema([{
    name: {
        type: String,
    },
    email: {
        type: String
    },
    category: {
        type: String
    },
    details: {
        type: String
    },
    price: {
        type: Number
    },
    projectDemoImg: {
        type: String
    },
    description: {
        type: String
    },
    img: {
        type: String
    }
}]);

const OrderModel = mongoose.model('order', orderSchema);

module.exports = OrderModel;