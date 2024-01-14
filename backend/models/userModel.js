const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
		type: String, 
		required: [true, 'Please fill the name field!']
	},
    email: {
		type: String, 
		required: [true, 'Please enter a valid email-address!']
	},
    password: {
		type: String, 
		required: [true, 'Please enter a valid password!']
	},
    totalBudget: {
		type: Number,
		required: false
	},
    monetaryUnit: {
		type: String,
		required: false
	},
  budgetUpdatedAt:{
    type: Date,
    required: false
  },
    dueDate: {
      type: Number,
      required: false
    }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}