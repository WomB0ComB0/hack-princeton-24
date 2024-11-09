const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
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
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: value => value >= 0,
            message: props => `${props.value} cannot be negative!`,
        },  
    },
    transactionType: {
        type: String,
        enum: [
            "deposit",          // Money added to the account
            "withdrawal",       // Money taken out from the account
            "transfer",         // Money transferred between accounts
            "payment",          // Payments for bills, loans, etc.
            "income",           // Earnings like salary or freelance work
            "expense",          // General spending or purchases
            "investment",       // Money put into investment assets
            "loan",             // Loan received or loan payment
            "refund",           // Money returned after a purchase
            "fee"               // Bank or service fees
        ],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        minLength: [5, 'Too short'],
        maxLength: [50, 'Too long'],
    },

})

const transaction = mongoose.model('transaction', transactionSchema);
module.exports = transaction;