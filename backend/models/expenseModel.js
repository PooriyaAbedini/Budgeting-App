const mongoose = require('mongoose');

const expensSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Expense title is required!'],
    },
    group: {
        type: String,
        required: [true, 'Expense group is required!'],
    },
    expense: {
        type: Number,
        required: [true, 'Expense amount is required!'],
    }, 
    monetaryUnit: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Expense = mongoose.model('Expense', expensSchema)

module.exports = { Expense }