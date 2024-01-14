import { 
  useSetExpenseMutation,
	useUpdateItemExpensesMutation,
	useSetChartDataMutation,
	selectBudgetData 
} from "../features/Items/itemSlice"
import { useEffect } from 'react'
import { useSelector } from "react-redux"
import { BsXLg } from "react-icons/bs"
import { toast, ToastContainer } from 'react-toastify'
import { format } from 'date-fns'
import styles from '../styles/home.module.css'

let pageReloads = 0;

const AddExpenseModal = (props) => {
	const [updateItemExpenses,{
    isLoading,
    isSuccess,
    isError,
    error
	}] = useUpdateItemExpensesMutation();
	const [setExpense] = useSetExpenseMutation();
	const [setChartData] = useSetChartDataMutation();
	const budgetData = useSelector(selectBudgetData);

	const errorMessage = error ? error.data.message : '';

	const addExpense = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const expense = Object.fromEntries(formData).expense;
		const newExpense = Number(props.expenses) + Number(expense);
    const date = format(new Date(), "yyyy-MM-dd");
    const thisMonth = new Date().getMonth();
		const itemId = props.id;
		const group = props.groupName;
		const title = props.title;
		const monetaryUnit = props.monetaryUnit;
    const monthBudget = budgetData.totalBudget;
		const initialItem = {
			itemId,
			newExpense
		}

    updateItemExpenses(initialItem);
    setExpense({ title, group, expense, monetaryUnit })
    setChartData({  
      expense, 
      monthBudget, 
      date,
      month: thisMonth
    });
    pageReloads = 0;
	}

  useEffect(() => {
    if(isLoading) {
      toast.loading('Pending...',{
        toastId: 'pending'
      })
    }
    if(isSuccess) {
      toast.dismiss('pending');
      pageReloads < 1 && toast.success('Added!');
      props.openModal(false);
      pageReloads++;
    }
    if(isError) { 
      toast.dismiss('pending');
      toast.error(errorMessage);
    }
  })

  return (
		<>
		<ToastContainer />
    <div className={`${styles.modalBackground}`}>
      <div className={`${styles.modalContainer}`}>
        <button type="button" 
          className={`${styles.closeButton} btn btn-outline-danger btn-sm`}
          onClick={() => props.openModal(false)}
        > 
          <BsXLg markerMid="true"/> 
        </button>
        <form className={`${styles.modalForm} mb-3`} onSubmit={addExpense}>
          <h5 className={`my-3`}>Expenses for <strong>{props.itemName}</strong></h5>
          <p>{props?.monetaryUnit}{props.alocatedBudget - props.expenses} left</p>
          <div className={`${styles.modalFormInputs} input-group`}>
            <div className="input-group-prepend">
              <span className={`input-group-text rounded-end-0`}>	{props?.monetaryUnit} </span>
            </div>
            <input 
              name="expense"
              type="number"
              step={0.01}
              placeholder="0.00"
              className={`form-control`}
            />
          </div>
          <div className={``}>
            <button type='submit' 
              className={`btn btn-outline-success mt-3`}
            > Add </button>
          </div>
        </form>
      </div>
    </div>
	</>
  )			
}

export default AddExpenseModal
