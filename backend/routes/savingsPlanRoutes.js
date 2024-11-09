const SavingsPlan = require('../models/savingsPlanSchema.js');
const express = require('express');
const savingsPlanRouter = express.Router();
const mongoose = require('mongoose');

savingsPlanRouter.get('/:goalId', async (req, res) => {
    try {
        const savingsPlan = await SavingsPlan.findOne({ goalId: ObjectId(req.params.goalId) });

        if(!savingsPlan) {
            res.status(404).json({ message: `No savingsPlan with ID ${req.params.goalId} exists for user` });
        }

        res.json(savingsPlan);
    } catch (error) {
        res.status(400).json({ message: "getSavingsPlansById failed"});
    }
});

// Track progress toward savings goal
savingsPlanRouter.get('/:goalId/progress', async (req, res) => {
    try {
        const plan = await SavingsPlan.findOne({ goalId: ObjectId(req.params.goalId) });
        if (!plan) return res.status(404).json({ message: 'Savings plan not found.' });

        const progress = (plan.currentAmount / plan.targetAmount) * 100;
        res.json({ progress: `${progress}%` });
    } catch (error) {
        res.status(500).json({ message: "Error calculating savings progress." });
    }
});

savingsPlanRouter.post('/:goalId', async (req, res) => {
 const { frequency, amount, startDate, nextContributionDate } = req.body;

    const savingsPlan = new SavingsPlan({
        goalId: ObjectId(req.params.goalId),
        frequency,
        amount,
        startDate,
        nextContributionDate,
    });

    try {
        const newSavingsPlan = await savingsPlan.save();
        res.status(201).json(newSavingsPlan);
    } catch(error) {
        res.status(400).json({ message: "saveNewSavingsPlan failed" });
    }
});

savingsPlanRouter.patch('/:goalId', async (req, res) => {
    try {
        const updatedSavingsPlan = await SavingsPlan.findOne(
            { goalId: ObjectId(req.params.goalId) },
            req.body,
            { new: true, runValidators: true},
        );

        if (!updatedSavingsPlan) {
            return res.status(404).json({ message: `No savingsPlan with ID ${req.params.goalId} exists for user` });
        }

        res.json(updatedSavingsPlan);
    } catch (error) {
        res.status(400).json({ message: "Error updating savings plan."});
    }
});

savingsPlanRouter.delete('/:goalId', async (req, res) => {
    try {
        const savingsPlan = await SavingsPlan.findOneAndDelete({ goalId: ObjectId(req.params.goalId) });
        res.status(200).json(savingsPlan);
    } catch (error) {
        res.status(500).json({ message: "Error deleting savings plan." });
    }
});




module.exports = savingsPlanRouter;