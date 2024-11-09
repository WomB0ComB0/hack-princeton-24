require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticateToken = require('./middlewares/authMiddleware'); 

// Import route files
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes');
const milestoneRoutes = require('./routes/milestoneRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const savingsPlanRoutes = require('./routes/savingsPlanRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT;
const dbURI = process.env.DB_URI;


// Middleware
app.use(cors());
app.use(express.json()); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Connect routes
app.use('/budgets', budgetRoutes);
app.use('/goals', goalRoutes);
app.use('/milestones', milestoneRoutes);
app.use('/notifications', notificationRoutes);
app.use('/savings', savingsPlanRoutes);
app.use('/transactions', transactionRoutes);
app.use('/users', userRoutes);

// Root route
app.get('/', (req, res) => {
    res.status(200).send("Connected to server successfully!");
});

// Connect to MongoDB and start the server
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => console.log(`Server is running on port ${port}`));
    })
    .catch((error) => console.error('Failed to connect to MongoDB', error));


