const mongoose = require('mongoose');

const monthlyExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  monthBudget: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true
  }
});

const MonthlyExpense = mongoose.model('MonthlyExpense', monthlyExpenseSchema);

module.exports = { MonthlyExpense }