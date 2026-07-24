const mongoose = require('mongoose');
const supportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'closed'],
        default: 'open',
    },
}, {
    timestamps: true,
});

const Support = mongoose.model('Support', supportSchema);
module.exports = Support;