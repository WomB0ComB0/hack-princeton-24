const Transaction = require('../models/transactionSchema.js');
const express = require('express');
const mongoose = require('mongoose');
const transactionRouter = express.Router();
const apiKey = process.env.VERBWIRE_API_KEY;
const verbwire = require('verbwire')(apiKey);
const authenticateToken = require('../middlewares/authMiddleware.js');
const { createNFT } = require('../verbwise/verbwiseMintOperations/index.js');

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
            goalId: new mongoose.Types.ObjectId(goalId.trim())
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
    const blockchainVerified = req.query.blockchainVerified === 'true';

    const transaction = new Transaction({
        goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()),
        userId: new mongoose.Types.ObjectId(req.params.userId.trim()),
        amount,
        transactionType,
        date: new Date(date),
        description,
        blockchainVerified,
    });
    

    try {

        const newTransaction = await transaction.save();

        if (blockchainVerified) {
            const execution = createNFT(transaction);

            
            if (newTransaction && execution.status === 'success') {
                res.status(200).json(newTransaction);
            } else {
                res.status(500).json({ message: "Failed to complete transaction." });
            }
        }

        if (newTransaction) {
            res.status(200).json(newTransaction);
        }
    } catch (error) {
        console.error("Error during processing:", error.message);
        res.status(400).json({ message: "saveNewTransaction failed", error: error.message });
    }
});



module.exports = transactionRouter;