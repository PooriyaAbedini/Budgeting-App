const asyncHandler = require('express-async-handler')
const { Expense } = require('../models/expenseModel')


//@desc getting user expenses in a specific time period
//@request GET api/expenses
const getExpenses = asyncHandler( async(req, res) => {
    if(!req.user) {
        res.status(401)
        throw new Error('Not Authorized!');
    } else {
        const userId = req.user._id;
        const userExpenses = await Expense.find({ user: userId });
        if(!userExpenses) {
            res.status(404).json({message: 'Expenses not found!'})
        } else {
            res.status(200).json(userExpenses);
        }
    }
})

const addExpense = asyncHandler( async(req, res) => {
    const { monetaryUnit, title, expense, group } = req.body;
    const userId = req.user._id;

    if(!monetaryUnit || !title || !group || !expense) {
        res.status(400)
        throw new Error('Provide all the requirements!')
    } 
    else if (!userId) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    else {
        const newExpense = await Expense.create({
            user: userId,
            title: title,
            group: group,
            expense: expense,
            monetaryUnit: monetaryUnit
        });
        if(!newExpense) {
            res.status(500)
            throw new Error('Something went wrong, try later!')
        }
        else {
            res.status(200).json(`New expense: ${newExpense.title}_${newExpense.expense}`)
        }
    }
})

const deleteAllExpenses = asyncHandler( async(req, res) => {
    const userId = req.user._id
    if(!userId) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    else {
        const deleteAll = await Expense.deleteMany({ user: userId});
        if(!deleteAll) {
            res.status(500)
            throw new Error('Something went wrong, try later!')
        }
        else {
            res.status(200).json(deleteAll);
        }
    }
})

module.exports = {
    getExpenses,
    addExpense,
    deleteAllExpenses
}