const express = require('express')
const router = express.Router()
const { getMe, 
    getBudget, 
    updateBudget,
    getDueDate,
    updateDueDate, 
    registerUser, 
    loginUser, 
    deleteUser } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware');


router.get('/me', protect, getMe);
router.get('/budget', protect, getBudget);
router.patch('/budget', protect, updateBudget);
router.get('/budgetDueDate', protect, getDueDate)
router.patch('/budgetDueDate/:dueDate', protect, updateDueDate)
router.post('/', registerUser);
router.post('/login', loginUser);
router.delete('/deleteAccount', protect, deleteUser);

module.exports = router