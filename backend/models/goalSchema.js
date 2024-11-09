const mongoose = require('mongoose');
const Transaction = require('./transactionSchema');
const Budget = require('./budgetSchema');
const Notification = require('./notificationSchema');


const goalSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    currentAmount: {
        type: Number,
        required: true,
        validate: {
            validator: value => value >= 0,
            message: props => `${props.value} cannot be negative!`,
        },        
    },
    startDate: {
        type: Date,
        required: true,
    },
    targetDate: {
        type: Date,
        required: true,
    },
    priorityLevel: {
        type: String,
        enum: ["low", "medium", "high"],
        required: true,
    }
})

goalSchema.pre('remove', async function(next) {
    const userId = this._id;
    
    // Cascading delete for associated models
    await Transaction.deleteMany({ userId });
    await Notification.deleteMany({ userId });
    await Budget.deleteMany({ userId });
    
    next(); 
});

const goal = mongoose.model('goal', goalSchema);
module.exports = goal;