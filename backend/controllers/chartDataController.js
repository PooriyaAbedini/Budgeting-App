const asyncHandler = require('express-async-handler')
const { Data } = require('../models/chartDataModel')
const { MonthlyExpense } = require('../models/monthAgregatedExpensesModel')
const {
  createWeeklyData,
  createMonthlyData,
  createAnualData
} = require('../modules/chartDataModules');

//@desc getting chart data
//request GET /api/chartdata
//access private
const getData = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  } 
  else {
    const data = await Data.find({ user: userId });
    if(data) {
      res.status(200).json(data);
    }
    else {
      res.status(500)
      throw new Error('Something went wrong!')
    } 
  }
});

//@desc getting chart data
//request GET /api/chartdata/userData
//access private
const getUserChartData = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  let { yearInputForMonthlyData, yearInputForAnualData, month } = req.body;
  if(!userId) {
    res.status(401)
    throw new Error('Not Athorized!')
  }
  else {
    let userData = await Data.find({ user: userId });
    
    if(!userData) {
      res.status(404)
      throw new Error('Not Found!')
    }
    else {
      //Creating Weekly Data
      const weeklyData = await createWeeklyData(userData, userId);

      //Creating Monthly Data
      const monthlyData = await createMonthlyData(yearInputForMonthlyData, month, userId);

      //Creating Anual Data
      const anualData = await createAnualData(yearInputForAnualData, userId);

      //Response
      res.status(200).json({ weeklyData, monthlyData, anualData });
    }    
  }
});

//@desc Creating 0 expense data for all days in a month
//request POST /api/chartdata/create
//access private
const setMonthAllDaysRawData = asyncHandler(async(req, res) => {
  const userId = req.user._id;

  const getMonthDaysNum = () => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const aDay = 1000 * 3600 * 24;
  
    if(thisMonth == 11) {
      return 31;
    }
    else {
      let nextMonthFirstDay = new Date(`${thisYear}-${thisMonth + 2}-1`)
      let monthDaysNum = new Date(nextMonthFirstDay - aDay).getDate();
  
      return monthDaysNum;
    }
  }
  let createdData = [];
  for(let i = 1; i <= getMonthDaysNum(); i++) {
    let today = new Date();
    const zeroExpenseData = await Data.create({
      user: userId,
      expense: 0,
      monetaryUnit: req.user.monetaryUnit,
      date: `${today.getFullYear()}-${today.getMonth() + 1}-${i}`,
      month: (today.getMonth() + 1),
      year: today.getYear()
    })
    if(zeroExpenseData) {
      createdData.push(zeroExpenseData);
    }
    else {
      res.status(500)
      throw new Error('Server Error!')
    }
  }
  if(createdData.length >= 28) {
    res.status(200).json(createdData)
  }
  else {
    res.status(500)
    throw new Error('Server Error!')
  }
});

//@desc Creating 0 expense data for all monthes in a year
//request POST /api/chartdata/anualRawData
//access private
const setAnualRawData = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!');
  }
  else {
    let createdItems = []
    for(let i = 0; i <= 11; i++) {
      let month = i;
      let createdItem = await MonthlyExpense.create({
        user: userId,
        expenses: 0,
        year: new Date().getFullYear(),
        month,
        monthBudget: 0
      })
      createdItems.push(createdItem);
    }
    if(createdItems) {
      res.status(200).json(createdItems);
    }
    else {
      res.status(500)
      throw new Error('Server Error: something went wrong with creating raw data!')
    }
  }
})

//@desc adding chart data
//request POST /api/chartdata
//access private
const setChartData = asyncHandler(async(req, res) => {
  const userId = req.user._id;

  let { 
    date,
    expense, 
    monthBudget, 
  } = req.body;

  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  }
  else if(!expense || !monthBudget || !date) {
    res.status(400)
    throw new Error('Provid all requrements!')
  }
  else {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    const newDate = `${year}-${now.getMonth() + 1}-${today}`
    const dailyData = await Data.findOne({ user: userId, date: newDate });
    const monthlyData = await MonthlyExpense.findOne({ user: userId, year: year, month: month });
    let dailyDataRes = null;
    let monthlyDataRes = null;

    //Setting Daily Data
    if(dailyData) {
      const newExpense = (Number(dailyData.expense) + Number(expense))
      const updatedData = await Data.updateOne({user: userId, date: newDate}, 
        { $set: { expense: newExpense } }
      );
      if(updatedData.acknowledged == true) {
        dailyDataRes = updatedData;
      }
    }
    else {
      const newMonth = new Date().getMonth() + 1;
      date = `${year}-${newMonth}-${today}`
      const newData = Data.create({
        user: userId,
        expense,
        monetaryUnit: req.user.monetaryUnit,
        date,
        month: newMonth
      });     
      dailyDataRes = newData;
    }

    //Setting Monthly Data
    if(monthlyData) {
      const newMonthlyExpense = Number(monthlyData.expenses) + Number(expense);
      const updatedMonthlyData = await MonthlyExpense.updateOne({ 
        user: userId, year: year, month: month}, {
          $set: { expenses: newMonthlyExpense, monthBudget: monthBudget }
        }
      );
      if(updatedMonthlyData.acknowledged === true) {
        monthlyDataRes = updatedMonthlyData;
      }
    }
    else {
      const newMonthlyData = MonthlyExpense.create({
        user: userId,
        expenses: expense,
        monthBudget,
        year,
        month
      });
      monthlyData = newMonthlyData;
    }

    //Response
    if(!dailyDataRes || !monthlyDataRes) {
      if(dailyDataRes) {
        res.status(500)
        throw new Error('Somthing went wrong with setting daily data!');
      }
      else if(monthlyDataRes) {
        res.status(500)
        throw new Error('Somthing went wrong with setting monthly data!');
      }
      else {
        res.status(500)
        throw new Error('Somthing went wrong with setting both monthly and daily data!');
      }
    }
    else {
      res.status(200).json({ dailyDataRes, monthlyDataRes });
    }
  }
});

//@desc deleting all chart data
//request DELETE /api/chartdata
//access private
const deleteAllData = asyncHandler(async(req, res) => {
  const userId = req.user._id;
  if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  }
  else {
    const deleteItems = await Data.deleteMany({ user: userId });
    if(!deleteItems) {
      res.status(500)
      throw new Error('Something went wrong try later!')
    }
    else {
      res.status(200).json(deleteItems);
    }      
  }
}); 

//@desc delete a single chart data
//request DELETE /api/chartdata/:id
//access private
const deleteData = asyncHandler(async(req, res) => {
  const dataId = req.params.id;
  const userId = req.user._id;
  if(!dataId) {
    res.status(500)
    throw new Error('ID is required!')
  }
  else if(!userId) {
    res.status(401)
    throw new Error('Not Authorized!')
  }
  else {
    const deletedData = await Data.deleteOne({ user: userId, _id: dataId });
    if(!deletedData) {
      res.status(500)
      throw new Error('Something went wrong, try later!')
    }
    else {
      res.status(200).json(deletedData);
    }   
  }
});

module.exports = {
  getData,
  setChartData,
  deleteData,
  deleteAllData,
  getUserChartData,
  setMonthAllDaysRawData,
  setAnualRawData,
}