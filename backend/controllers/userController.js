const { User } = require('../models/userModel')
const { Item } = require('../models/itemModel')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '1d'
    })
}

//@desc: getting users data
//@route: GET /api/users/me
//@access private
 const getMe = asyncHandler(async(req, res) => {
    const me = req.user;
    res.status(200).json(me)
})

//@desc: getting users total budget
//@route: GET /api/users/budget
//@access private
const getBudget = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  } else {
    const user = await User.findById(userId);
    const budget = {
      monetaryUnit: user.monetaryUnit,
      totalBudget: user.totalBudget,
      budgetUpdatedAt: user.budgetUpdatedAt
    };
    res.status(200).json(budget);
  }
})

//@desc: Updating users total budget
//@route: PATCH /api/users/budget
//@access private
const updateBudget = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  const newBudget = req.body.budget.budgetAmount;
  const newUnit = req.body.budget.monetaryUnit;

  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!');
  }
  if(!newBudget || !newUnit) {
    res.status(400)
    throw new Error('Something went wrong with resiving new budget amount!');
  } 
  else {
    //Updating budget
    const updatedBudget = await User.updateOne({ _id: userId },{ 
      $set:{ 
        totalBudget: newBudget, 
        monetaryUnit: newUnit,
        budgetUpdatedAt: new Date() 
        }
      }, { new: false });

    //Reseting Group settings
    const updatedItems = await Item.updateMany({ user: userId}, {
      $set:{ 
      alocatedBudget: 0,
      expenses: 0 
      }
    }) 
    if(!updatedBudget || !updatedItems) {
      res.status(500)
      throw new Error('Something went wrong try later!')
    } else {
      res.status(200).json({ message: `Total budget updated: ${newBudget}`})
    }
  }
});
//@desc: getting budget alocation due date
//@route: PATCH /api/users/budgetDueDate/:dueDate
//@access private
const getDueDate = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Athorized!')
  }
  else {
    const user = await User.findById(userId)
    const dueDate = user.dueDate;

    if(!dueDate) {
      res.status(500)
      throw new Error('Something went wrong, try later!')
    }
    else {
      res.status(200).json(dueDate);
    }
  }
})

//@desc: Updating budget alocation due date
//@route: PATCH /api/users/budgetDueDate
//@access private
const updateDueDate = asyncHandler(async(req, res) => {
  const dueDate = Number(req.params.dueDate);
  
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  }
  else if(!dueDate) {
    res.status(400)
    throw new Error('Due date needed!')
  }
  else {
    const updatedDueDate = await User.updateOne({ _id: userId }, { 
      dueDate: dueDate
    });

    if(!updatedDueDate) {
      res.status(500)
      throw new Error('Something went wrong try later!')
    }
    else {
      res.status(200)
      .json(updatedDueDate)
    }

  }
})

//@desc: registering user
//@route: POST /api/users
//@access public
 const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please fill all requred fields!')
  }

  const userExists = await User.findOne({ email });

  if(userExists) {
    res.status(400)
    throw new Error('User exists!')
  }
  else {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      totalBudget: 0,
      monetaryUnit: '$',
      dueDate: 1,
      budgetUpdatedAt: new Date(),
    })

    if(newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        monetaryUnit: newUser.monetaryUnit,
        totalBudget: newUser.totalBudget,
        dueDate: newUser.dueDate,
        budgetUpdatedAt: new Date(),
        token: generateToken(newUser._id)
      })
    } 
    else {
      res.status(400)
      throw new Error('Something went wrong, try later!')
    }
  }
})

//@desc: Logging user in
//@route: POST /api/users/login
//@access private
 const loginUser = asyncHandler(async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400)
    throw new Error('Please fill required fields!')
  }

  const user = await User.findOne({ email });

  if(!user) {
    res.status(404)
    throw new Error('There is no user with this email-address')
  } 
  else {
    if(await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        monetaryUnit: user.monetaryUnit,
        totalBudget: user.totalBudget,
        dueDate: user.dueDate,
        token: generateToken(user.id)
      })
    }
    else {
      res.status(401)
      throw new Error('Wrong password!')
    }
  }
})

//@desc: Deleting User
//@route: DELETE /api/users/deleteAccount
//@access private
const deleteUser = asyncHandler(async(req, res) => {

})

module.exports = {
  getMe,
  getBudget,
  updateBudget,
  getDueDate,
  updateDueDate,
  registerUser,
  loginUser,
  deleteUser
}
