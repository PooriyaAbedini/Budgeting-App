import { useState } from 'react'
import { BsPlusLg } from "react-icons/bs"
import { useSelector } from 'react-redux'
import { toast, ToastContainer} from 'react-toastify'
import AddExpenseModal from "./AddExpencesModal"
import styles from "../styles/home.module.css"
import { 
  useGetBudgetQuery,
  useGetDueDateQuery,
  selectBudgetData,
} from '../features/Items/itemSlice'


const HomeExpenceInstances = (props) => {
  useGetBudgetQuery();
  useGetDueDateQuery();

  const currentBudget = useSelector(selectBudgetData);
  const monetaryUnit = currentBudget ? currentBudget.monetaryUnit : '$';

	const [modal, setModal] = useState(false);
	const [itemToUpdate, setItemToUpdate] = useState('');
	const [idToUpdate, setIdToUpdate] = useState('');
	const [amountToUpdate, setAmountToUpdate] = useState(0);
	const [budget, setBudget] = useState(0);

	const onAddExpense = (e) => {
		const budgetingData = e.currentTarget.value.split(" ");
      setModal(true);
      setItemToUpdate(e.currentTarget.name);
      setIdToUpdate(e.currentTarget.id);
      setAmountToUpdate(budgetingData[1]);
      setBudget(budgetingData[0]);
	}

  const findPercentage = (expense, alocatedBudget) => {
    const percentage = Math.round(((expense / alocatedBudget) * 10000) / 100).toFixed(2);
    if(Number(percentage) > 0) {
      return percentage
    }
    else {
      return 0
    }
  }

  let itemCount = 0;
	return (
    <>
    <ToastContainer />
    { 
    props.items?.map(item => {
      if (item.group === props.groupName && item.title !== 'Sample' && item.alocatedBudget !== 0) {
        const alocatedBudget = Math.round((item.alocatedBudget * 100) /100).toFixed(2);
        const expenses = Math.round((item.expenses * 100) / 100).toFixed(2);
        itemCount++;
        return (
        <li id={item._id} key={item._id} className={`${styles.expensesListLi} `}>
          <div className={`${styles.progressGroup} form-group row mb-0`}>
            <div className={`${styles.titleBox} pt-2 pb-2 mx-3`}>
              <span type="text" 
                className={`${styles.lable}`}   
                value={item.title}
                name="groupName"
                disabled
              >
                {item.title}
              </span> 
              <div className={`${styles.sapnsDiv}`}>
                  <p className={`${styles.p}`}>spent: {expenses}</p>
                  <p className={`${styles.p}`}>left: {alocatedBudget - expenses}</p>
              </div>
            </div>
            <div className={`${styles.progressBox}`} style={{ height: '40px' }}>
              <div className={`${styles.progress}`} style={{ height: '10px' }}>
                <meter className={`${styles.meter}`} 
                  id={`meter${item._id}`}
                  low={alocatedBudget * 70 / 100}
                  high={alocatedBudget * 90 / 100}
                  min={0} max={alocatedBudget} 
                  value={expenses}
                  style={{height: '2vh'}} />
                  {
                    <span><small>% { findPercentage(expenses, alocatedBudget) }</small></span>
                  }									
              </div>
            </div>
            <div className={styles.buttonBox}>
              <button id={item._id}
                key={expenses}
                value={`${alocatedBudget} ${expenses}`}
                name={item.title} 
                className={`btn`} 
                type="button"
                onClick={onAddExpense}
              >
                <BsPlusLg color='white' /> 
              </button>
            </div>
          </div>
          { modal && 
            <AddExpenseModal id={idToUpdate} 
              alocatedBudget={budget}
              itemName={itemToUpdate} 
              groupName={item.group}
              title={item.title} 
              expenses={amountToUpdate} 
              openModal={setModal}
              monetaryUnit={monetaryUnit}
            /> 
          }
        </li>
        )
      }
    })
    }
    {
      itemCount === 0 && 
      <div>
        <br />  
        <p>You've not added any items to this group or not alocated budget to your items.</p>
      </div>
    }
    </>
	)
}

export default HomeExpenceInstances
