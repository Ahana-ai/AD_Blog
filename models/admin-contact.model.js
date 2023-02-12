const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: ""
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = new mongoose.model('admin-contact', ContactSchema);