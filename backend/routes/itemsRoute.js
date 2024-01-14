const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const { getItems, 
        getItemGroups,
        setItem, 
        setGroup,
        updateItem, 
        deleteItem, 
        deleteGroup,
        deleteAll, 
        updateExpenses 
    } = require('../controllers/ItemController')

const router = express.Router()


router.route('/').get(protect, getItems)
        .post(protect, setItem)
        .delete(protect, deleteAll);
router.route('/:itemId')
        .put(protect, updateItem)
        .delete(protect, deleteItem);
router.route('/groups').get(protect, getItemGroups)
        .post(protect, setGroup)
        .delete(protect, deleteGroup);
router.route('/groups/:groupName').delete(protect, deleteGroup);
router.patch('/expenses/:itemId', protect, updateExpenses);

module.exports = router