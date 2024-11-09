const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'goal',
    },
    notificationType: {
        type: String,
        enum: ["in-app", "text", "call", "email"],
        required: true,
    },
    dateScheduled: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
    },
})

const notification = mongoose.model('notification', notificationSchema);
module.exports = notification;