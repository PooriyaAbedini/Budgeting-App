import {
  useGetExpensesQuery,
  selectAllExpenses,
} from '../features/Items/itemSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import Header from "../components/Header"
import date from '../features/modules/date'
import styles from '../styles/expenses.module.css'
import 'react-datepicker/dist/react-datepicker.css';

const Expenses = () => {

  useGetExpensesQuery();
  const expenses = useSelector(selectAllExpenses)

  const [selectedDate1, setSelectedDate1] = useState(null);
  const onChange1 = (date) => {
    setSelectedDate1(date);
  }
  const [selectedDate2, setSelectedDate2] = useState(null);
  const onChange2 = (date) => {
    setSelectedDate2(date);
  }

  let dateOne = new Date(selectedDate1).toLocaleDateString();
  let dateTwo = new Date(selectedDate2).toLocaleDateString();

  return (
    <>
      <div className={`${styles.navbar}`}>
       <Header />
      </div>
      <div className={`${styles.container}`}>
        <div className={`${styles.expensesContainer}`}>
          <div className={`${styles.title}`}>
            <h3>
              Expenses
            </h3>
          </div>
          <p>Here you can check for your expenses details. in order to access your expenses
             in a specific period of time choose that, using this date range picker:
          </p>
          <br />
          <form className={`${styles.datePickerContainer}`}>
            <div id='label1'>
             <span className={`${styles.datePickerLabels} mx-3`}> from: </span>
            </div>
            <div>
              <DatePicker className='form-control' onChange={onChange1} 
                selected={selectedDate1}
                dateFormat={'yyyy/MM/dd'}
              />
            </div>
            <div id='label2'>
             <span className={`${styles.datePickerLabels} mx-3`}> to: </span>
            </div>
            <div>
              <DatePicker className='form-control' onChange={onChange2}
                selected={selectedDate2}
                dateFormat={'yyyy/MM/dd'}
              />
            </div>
          </form>
          <div className={`${styles.allExpensesContainer}`}>
            {expenses && expenses.map((expense, i) => {
              const expenseDate = date(expense.createdAt).fullDate;
              const dateToCompare = new Date(expenseDate).toLocaleDateString();
              if(dateToCompare >= dateOne && dateTwo >= dateToCompare) {
                return (
                  <div className={`${styles.expenseDataContainer} text-white bg-dark card my-3`} key={i}>
                    <div className={`${styles.spanContainer}`}>
                      <span><strong>{expense.group} </strong></span>
                      <span>{expense.title} : </span>
                      <span>{expense.expense}{expense.monetaryUnit} </span>
                    </div>
                    <small className='card-footer'>{expenseDate}</small>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Expenses
