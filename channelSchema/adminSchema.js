const mongoose = require('mongoose');

const adminSchema = mongoose.Schema([{
    email: {
        type: String,
    }
}]);

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;