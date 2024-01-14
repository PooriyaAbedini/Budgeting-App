const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router();
const {
    getExpenses,
    addExpense,
    deleteAllExpenses
} = require('../controllers/expenseController')


router.route('/')
    .get(protect, getExpenses)
    .post(protect, addExpense)
    .delete(protect, deleteAllExpenses);


module.exports = router;