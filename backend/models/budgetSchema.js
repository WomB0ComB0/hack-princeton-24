const mongoose = require('mongoose');


const budgetSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    monthlyIncome: {
        type: Number,
        required: true,
        min: 0,
    },
    monthlyExpenses: {
        type: Number,
        required: true,
        min: 0,
    },
    budgetCategories: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const budget = mongoose.model('budget', budgetSchema);
module.exports = budget;