const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Goal = require('./goalSchema');
const Transaction = require('./transactionSchema');
const Budget = require('./budgetSchema');
const Notification = require('./notificationSchema');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [6, 'Must be at least 6 characters'],
        maxLength: [30, 'Too many characters'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // Regular expression for a basic email pattern
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    passwordHash: {
        type: String,
        required: true,
    },
}, { timestamps: true });


userSchema.pre('remove', async function(next) {
    const userId = this._id;
    
    // Cascading delete for associated models
    await Goal.deleteMany({ userId });
    await Transaction.deleteMany({ userId });
    await Notification.deleteMany({ userId });
    await Budget.deleteMany({ userId });
    
    next(); 
});

userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified
    if (!this.isModified('passwordHash')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
        next(); // Proceed to save the document
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
});




const user = mongoose.model('user', userSchema);
module.exports = user;