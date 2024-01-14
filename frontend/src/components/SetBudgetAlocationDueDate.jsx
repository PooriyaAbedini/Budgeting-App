import { useGetDueDateQuery,
   useUpdateDueDateMutation,
   selectDueDate, 
  } from '../features/Items/itemSlice';
import { useSelector } from 'react-redux';
import styles from '../styles/category.module.css'

const SetBudgetAlocationDueDate = () => {
  useGetDueDateQuery()
  
  const currentDueDate = useSelector(selectDueDate);

  const [updateDueDate] = useUpdateDueDateMutation();

  const monthDaysNum = 30;
  const daysArr = [];
  for (let i = 1; i <= monthDaysNum; i++) {
    daysArr.push(i)
  }

  const setDueDate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { dueDate } = Object.fromEntries(formData);
    updateDueDate(dueDate);
  }
  return (
    <>
      <div className={`${styles.dueDateContainer}`}>
        <h3>Alocation Due Date:</h3>
        <h5>Current due date: { currentDueDate && currentDueDate[0]}</h5>
        <p>  
          Every month, on a certain deadline, you should update the overall budget that you have considered for that month. In this section, you can choose a specific day of the month so that we can ask you for a new update on the same day every month:
        </p>
        <br />
        <br />
        <form className={`form-inline`} onSubmit={setDueDate}>
          <div className={`${styles.input} input-group`}>
            <select className={`form-select`} name="dueDate" id="dueDate">
              {
                daysArr.map(day => {
                  return <option key={day}>{ day }</option>
                })
              }
            </select>
            <button className={`btn btn-success`} type='submit'>Set</button>
          </div>
        </form>
      </div> 
    </>
  )
}

export default SetBudgetAlocationDueDate
