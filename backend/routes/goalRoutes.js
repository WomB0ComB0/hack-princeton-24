const Goal = require('../models/goalSchema.js');
const express = require('express');
const goalRouter = express.Router();
const mongoose = require('mongoose');


// get all progress for all goals for a user
goalRouter.get('/:userId/progress', async (req, res) => {
    try {
        const goal = await Goal.find({ userId: new mongoose.Types.ObjectId(req.params.userId.trim()) });
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        const progress = goal.targetAmount ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
        res.json({ progress: `${progress}%` });
    } catch (error) {
        res.status(500).json({ message: "Error calculating progress" });
    }
});

// get all goals for a user
goalRouter.get('/:userId', async (req, res) => {
    try {
        const userGoals = await Goal.find({ userId: new mongoose.Types.ObjectId(req.params.userId.trim()) });

        if(!userGoals) {
            return res.status(404).json({ message: "No goals exist for user"});
        }

        res.json(userGoals);
    } catch (error) {
        res.status(400).json({ message: "getGoalsById failed"});
    }
});

goalRouter.post('/:userId', async (req, res) => {

    const { name, targetAmount, currentAmount, startDate, targetDate, priorityLevel } = req.body;

    const goal = new Goal({
        userId: new mongoose.Types.ObjectId(req.params.userId.trim()),
        name,
        targetAmount,
        currentAmount,
        startDate,
        targetDate,
        priorityLevel,
    });

    try {
        const newGoal = await goal.save();
        res.status(201).json(newGoal);
    } catch(error) {
        res.status(400).json({ message: "saveNewGoals failed"});
    }
});

goalRouter.patch('/:userId', async (req, res) => {
    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(req.params.userId.trim()) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: "Goal not found." });
        }

        res.status(200).json(updatedGoal);
    } catch (error) {
        res.status(400).json({ message: "Error updating goal" });
    }
});

goalRouter.delete('/:userId', async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({ userId: new mongoose.Types.ObjectId(req.params.userId.trim()) });
        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting goal" });
    }
})

module.exports = goalRouter;