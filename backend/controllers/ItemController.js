const asyncHandler = require('express-async-handler')
const { Item } = require('../models/itemModel');

//@desc getting users items
//request GET /api/items/
//access private
const getItems = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    const items = await Item.find({ user: userId });
    if(!items) {
        res.status(404)
        throw new Error('Items not found!')
    }
    res.status(200).json(items);
})

//@desc getting users groups
//request GET /api/items/groups
//access private
const getItemGroups = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    let groups = [];
    let id = 1;
    const items = await Item.find({ user: userId});

    if(items.length !== 0) {
        groups.push({
            _id: id++,
            title: items[0].group
        });
        items.map(item => {
            let repetitive = false;
            for (index of groups) {
                if (index.title == item.group) repetitive = true;
            }
            if(!repetitive) {
                groups.push({
                    _id: id++,
                    title: item.group
                });
            }
        })
    } 
    if(items.length !== 0 && groups.length == 0) {
        res.status(400)
        throw new Error('Something went wrong try later!')
    }  
    if(items.length == 0) {
        res.status(200).json([]);
    } 
    else {
        res.status(200).json(groups);
    }
})

//@desc setting an item in a specific category
//request POST /api/items/
//access private
const setItem = asyncHandler( async(req, res) => {

    const { title, alocatedBudget, group } = req.body
    
    if(!title || !group || !alocatedBudget) {
        res.status(400) 
        throw new Error('Fill all required fields!');
    }
    
    const itemExists = await Item.findOne({user: req.user._id ,title: title, group: group});

    if(itemExists) {
        res.status(400)
        throw new Error('Item Exists!');
    }
    else {
        const newItem = await Item.create ({
            user: req.user._id,
            title: title,
            group: group,
            expenses: 0,
            alocatedBudget: Number(alocatedBudget)
        })

        res.status(200).json(newItem)
    }
})

//@desc adding group
//request POST /api/items/groups
//access private
const setGroup = asyncHandler( async(req, res) => {
    const userId = req.user._id;
    const groupName = req.body.groupName.group;

    if(!userId) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    if(!groupName) {
        res.status(400)
        throw new Error('Bad Request!')
    }
    else {
        const groupExists = await Item.findOne({ user: userId, group: groupName });
        if(groupExists) {
            res.status(200).json({ message: 'Group exists!'})
        }
        else {
            const newItem = await Item.create({
                user: userId,
                title: 'Sample',
                group: groupName,
                expenses: 0,
                alocatedBudget: 0
            })
            if(newItem) res.status(200).json({message: 'Group Added!'});
            else {
                res.status(400) 
                throw new Error('Something went wrong through adding new group!')
            }
        }
    }
})

//@desc updating an specific items title 
//request PUT /api/items/:itemId
//access private
const updateItem = asyncHandler( async(req, res) => {
    const newExpense = req.body.initialItem.alocatedBudget;

    const itemId = req.params.itemId;
    const userId = req.user._id;
    
    if(!req.user) {
        res.status(401)
        throw new Error('User not authorized!')
    }
    else { 
        const updatedItem = await Item.updateOne({ user: userId, _id: itemId },
            { alocatedBudget: newExpense }, {new: true})
        if(!updatedItem) {
            res.status(500)
            throw new Error('Something went wrong, try later!');
        } else {
            res.status(200).json({
                updatedItem
            })
        }
    }

})

//@desc updating expenses of an specific item 
//request PATCH /api/items/expenses/:itemId
//access private
const updateExpenses = asyncHandler( async(req, res) => {
    const { newExpense } = req.body;
    
    const itemToUpdate = await Item.findOne({ _id: req.params.itemId })

    if(!req.user) {
        res.status(401)
        throw new Error('User not found!')
    }
    else if(!itemToUpdate) {
        res.status(404)
        throw new Error('Item not found!')
    }
    else {
        const updatedItem = await Item.updateOne({ _id: req.params.itemId, user: req.user._id }, {
            expenses: newExpense
        })
        if(!updatedItem) {
            res.status(500)
            throw new Error('Something went wrong, try later')
        }
        else {
            res.status(200).json({
                id: itemToUpdate._id,
                expenses: newExpense
            })
        }
    }
})

//@desc deleteing a specific item
//request DELETE /api/items/:itemId
//access private
const deleteItem = asyncHandler( async(req, res) => {
    const idToDelete = req.params.itemId;

    if(!req.user) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    else {
        const deletedItem = await Item.deleteOne({ _id: idToDelete });
        if(!deletedItem) {
            res.status(500)
            throw new Error('Something went wrong, try later!')
        }
        res.status(200).json({_id: idToDelete})
    }
})


//@desc deleting items by groupName
//request DELETE /api/items/groups/:groupName
//access private
const deleteGroup = asyncHandler( async(req, res) => {
    const groupToDelete = req.params.groupName;
    const userId = req.user._id;

    if(!req.user) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    const isDeleted = await Item.deleteMany({ group: groupToDelete, user: userId });

    if(!isDeleted) {
        res.status(400)
        throw new Error('Something went wrong with deleting group items');
    }
    else {
        res.status(200).json({ message: "Deleted" })
    }
})

//@desc deleting users items
//request DELETE /api/items/
//access private
const deleteAll = asyncHandler( async(req, res) => {
    if(!req.user) {
        res.status(401)
        throw new Error('User not authorized!')
    }
    else {
        const allDeleted = await Item.deleteMany({user: req.user._id});
        if(!allDeleted) {
            res.status(500)
            throw new Error('Something went wrong through deleting items, try later!')
        }
        else {
            res.status(200).json({
                message: 'All deleted!',
                allDeleted
            })
        }
    }
})

module.exports = {
    getItems,
    getItemGroups,
    setItem,
    setGroup,
    updateItem,
    updateExpenses,
    deleteItem,
    deleteGroup,
    deleteAll
}

