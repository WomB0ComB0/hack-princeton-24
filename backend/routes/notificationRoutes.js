const Notification = require('../models/notificationSchema.js');
const express = require('express');
const mongoose = require('mongoose');
const notificationRouter = express.Router();
const cron = require('node-cron');
const authenticateToken = require('../middlewares/authMiddleware.js');


notificationRouter.get('/:userId', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.find({ userId: new mongoose.Types.ObjectId(req.params.userId.trim()) });

        if(!notification) {
            return res.status(404).json({ message: `No notification with ID ${req.params.userId} exists for user` });
        }

        res.json(notification);
    } catch (error) {
        res.status(400).json({ message: "getNotificationsById failed"});
    }
});

notificationRouter.get('/:userId/:goalId', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.find(
            { userId: new mongoose.Types.ObjectId(req.params.userId.trim()) },
            { goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()) },
        );

        if (!notification) {
            return res.status(404).json({ message: 'No notification found for specified user ID and goal ID' });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving notification by userId and goalId" });
    }
});


notificationRouter.post('/:userId/:goalId', authenticateToken, async (req, res) => {
    const { notificationType, dateScheduled, message } = req.body;

    const notification = new Notification({
        userId: new mongoose.Types.ObjectId(req.params.userId.trim()),
        goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()),
        notificationType,
        dateScheduled,
        message,
    });

    try {
        const newNotification = await notification.save();

        const date = new Date(notification.dateScheduled);
        const cronExpression = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
        
        const job = cron.schedule(cronExpression, () => {
            console.log(`Sending notification: ${notification.message}`);
        }, {
            scheduled: true
        });

        res.status(201).json(newNotification);
    } catch(error) {
        res.status(400).json({ message: "saveNewNotification failed" });
    }
});

// Update notification by userId and goalId
notificationRouter.patch('/:userId/:goalId', authenticateToken, async (req, res) => {
    const allowedUpdates = ['notificationType', 'dateScheduled', 'message'];
    const updates = {};

    // Filter req.body to only allow specific fields to be updated
    Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    try {
        const updatedNotification = await Notification.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(req.params.userId.trim()) }, 
            { goalId: ObjectId(req.params.goalId) },
            updates,
            { new: true, runValidators: true }
        );

        const date = new Date(updatedNotification.dateScheduled);
        const cronExpression = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
        
        const job = cron.schedule(cronExpression, () => {
            console.log(`Sending notification: ${updatedNotification.message}`);
        }, {
            scheduled: true
        });

        if (!updatedNotification) {
            return res.status(404).json({ message: `No notification found for user ID ${req.params.userId} and goal ID ${req.params.goalId}` });
        }

        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(400).json({ message: "Error updating notification", error });
    }
});

notificationRouter.delete('/:userId/:goalId', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete(
            { userId: new mongoose.Types.ObjectId(req.params.userId.trim()) },
            { goalId: new mongoose.Types.ObjectId(req.params.goalId.trim()) },
        );

        if (!notification) {
            return res.status(404).json({ message: `No notification found for user ID ${req.params.userId} and goal ID ${req.params.goalId}` });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Error deleting notification", error });
    }
});


// Bulk delete notifications by scheduled date
notificationRouter.delete('/:userId', authenticateToken, async (req, res) => {
    try {
        const result = await Notification.deleteMany({ dateScheduled: { $lte: req.body.date } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error deleting notifications", error });
    }
});


module.exports = notificationRouter;