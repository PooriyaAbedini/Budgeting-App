const { Data } = require('../models/chartDataModel');
const { MonthlyExpense } = require('../models/monthAgregatedExpensesModel');
const { mergSort } = require('./mergSortModule')

const createWeeklyData = async(userData, userId) => {
  let weeklyData = [];

  //Sorting Data
  userData = mergSort(userData);

  //Creating Hash map from userData
  const dataMap = new Map();
  for(let data of userData) {
    dataMap.set(new Date(data.date).toLocaleDateString(), data)
  }

  //Getting this weeks dates;
  let week = [];
  const now = new Date();
  now.setDate((now.getDate() - now.getDay()));
  for(let i = 0; i < 7; i++) {
    week.push(now.toLocaleDateString());
    now.setDate(now.getDate() + 1);
  }

  for(let date of week) {
    const data = await dataMap.get(date);
    if(data) {
      weeklyData.push({
        user: data.user,
        date: data.date,
        expense: data.expense,
        month: data.month,
        monetaryUnit: data.monetaryUnit
      });
    }
    else {
      weeklyData.push({
        user: userId,
        expense: 0,
        date: date, 
      })
    }
  }
  return weeklyData;
}

const createMonthlyData = async(year, month, userId) => {
  if(!year) {year = new Date().getFullYear()};
  if(!month) {month = new Date().getMonth() + 1};
  
  const data = await Data.find({ user: userId ,month: month });
  let monthlyData = [];
  for (let item of data) {
    if(new Date(item.date).getFullYear() == year) {
      monthlyData.push({
        user: item.user,
        expense: item.expense,
        date: item.date,
        month: item.month,
      });
    }
  }
  //Sorting data
  monthlyData = mergSort(monthlyData)

  return monthlyData;
}

const createAnualData = async(year, userId) => {
  if(!year) year = new Date().getFullYear();
  const data = await MonthlyExpense.find({ user: userId ,year: year });
  return data;
}

module.exports = {
  createWeeklyData,
  createMonthlyData,
  createAnualData
}