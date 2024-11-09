const Transaction = require('../models/transactionSchema.js');
const express = require('express');
const mongoose = require('mongoose');
const transactionRouter = express.Router();
const apiKey = process.env.VERBWIRE_API_KEY;
const verbwire = require('verbwire')(apiKey);
const authenticateToken = require('../middlewares/authMiddleware.js');

transactionRouter.get('/:userId', authenticateToken, async (req, res) => {
    
    try {
        const transactions = await Transaction.find({ userId: new mongoose.Types.ObjectId(req.params.userId.trim())});
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: "getTransactionsById failed"});
    }
});

transactionRouter.get('/:userId/:goalId', authenticateToken, async (req, res) => {
    try {
        const transactions = await Transaction.find(
            { userId: new mongoose.Types.ObjectId(req.params.userId.trim()) },
            { goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()) },
        );

        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ message: "getTransactionsById failed"});
    }
});

transactionRouter.get('/:userId/:goalId/summary', authenticateToken, async (req, res) => {
    try {

        
        const { userId, goalId } = req.params;
        const { transactionType, date } = req.params;
        const matchCondition = {
            userId: new mongoose.Types.ObjectId(userId.trim()),
            goalId: new mongoose.Types.ObjectId(userId.trim())
        };

        if (transactionType) {
            matchCondition["transactionType"] = transactionType;
        }

        if (date) {
            matchCondition["date"] = new Date(date);
        }
        const summary = await Transaction.aggregate([
            { $match: matchCondition },
            { $group: { _id: "$transactionType", totalAmount: { $sum: "$amount" } } },
            { $group: { _id: { _id: "$transactionType", date: "$date" }, totalAmount: { $sum: "$amount" }  } },
        ]);
        res.json(summary.length ? summary : [{ _id: "none", totalAmount: 0 }]);
    } catch (error) {
        res.status(500).json({ message: "Error calculating transaction summary" });
    }
});

transactionRouter.get('/:userId/summary', authenticateToken, async (req, res) => {
    try {
        const userId = req.params;
        const { transactionType, date } = req.query;

        const matchCondition = {
            userId: new mongoose.Types.ObjectId(userId.trim())
        };

        if(transactionType) {
            matchCondition["transactionType"] = transactionType;
        }

        if (date) {
            matchCondition["date"] = new Date(date);
        }
        const summary = await Transaction.aggregate([
            { $match: matchCondition },
            { $group: { _id: "$transactionType", totalAmount: { $sum: "$amount" } } },
            { $group: { _id: { transactionType: "$transactionType", date: "$date" }, totalAmount: { $sum: "$amount" }  } },
        ]);
        res.json(summary.length ? summary : [{ _id: "none", totalAmount: 0 }]);
    } catch (error) {
        res.status(500).json({ message: "Error calculating transaction summary" });
    }
});


transactionRouter.post('/:userId/:goalId', authenticateToken, async (req, res) => {
    const { amount, transactionType, date, description } = req.body;

    const transaction = new Transaction({
        goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()),
        userId: new mongoose.Types.ObjectId(req.params.userId.trim()),
        amount,
        transactionType,
        date: new Date(date),
        description,
    });
    

    const metaData = {
        name: `Date: ${transaction.date} Goal: ${transaction.goalId} Transaction: ${transaction.transactionType} Amount: ${transaction.amount}`,
        description: `${transaction.description}`,
        contractAddress: '0xB4EDD991e2b6b7fa041122F5b9A82Eed2f740Be3',
        data: JSON.stringify([
            { "trait_type": "goalId", "value": transaction.goalId.toString() },
            { "trait_type": "userId", "value": transaction.userId.toString() },
            { "trait_type": "amount", "value": `${transaction.amount} USD` },
            { "trait_type": "transactionType", "value": transaction.transactionType },
            { "trait_type": "date", "value": transaction.date.toISOString() },
            { "trait_type": "description", "value": transaction.description },
        ]),
        chain: 'sepolia',
    };

    try {

        const newTransaction = await transaction.save();
        const success = await verbwire.mint.mintFromMetadata(metaData);

        if (newTransaction && success) {
            res.status(200).json(newTransaction);
        } else {
            res.status(500).json({ message: "Failed to complete transaction and mint." });
        }
    } catch (error) {
        console.error("Error during processing:", error.message);
        res.status(400).json({ message: "saveNewTransaction failed", error: error.message });
    }
});



module.exports = transactionRouter;