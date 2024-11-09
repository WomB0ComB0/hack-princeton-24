const mongoose = require('mongoose');

const savingsPlanSchema = mongoose.Schema({
    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'goal',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    frequency: {
        type: String,
        enum: ["weekly", "monthly", "biweekly", "daily", "bianually", "annually"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {

                if (props < 0) {
                    return false;
                } else {
                    return true;
                }
            },

            message: props => `${props.value} cannot be negative!`
        }
    },
    startDate: {
        type: Date,
        required: true,
    },
    nextContributionDate: {
        type: Date,
        required: true,
    },
})

const savingsPlan = mongoose.model('savingsPlan', savingsPlanSchema);
module.exports = savingsPlan;