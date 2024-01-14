const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    expense:{
      type: Number,
      required: true
    },
    monetaryUnit: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    month: {
      type: Number,
      required: true
    }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = { Data }