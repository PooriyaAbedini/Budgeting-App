const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Inorder to create an item in your category, you should choose a name for it'],
    },
    group: {
        type: String,
        required: [true, 'Choose a category for your item']
    },
    alocatedBudget: {
        type: Number,
        required: false
    },
    expenses: {
        type: Number,
        required: false
    }
},{
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema);

module.exports = { Item }

