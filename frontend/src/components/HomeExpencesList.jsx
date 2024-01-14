import { 
  selectUserItems, 
  selectAllGroups,
  selectBudgetData,
  selectDueDate,
  useGetBudgetQuery, 
  useGetItemGroupsQuery, 
  useGetUserItemsQuery,
} from "../features/Items/itemSlice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import HomeExpensesCollapseComp from "./HomeExpensesCollapseComp"
import HomeTotalBudgetComp from './HomeTotalBudgetComp'
import AlocateNewBudgetModal from "./AlocateNewBudgetModal"
import styles from "../styles/home.module.css"

const HomeExpencesComp = () => {
  
  useGetItemGroupsQuery();
  useGetUserItemsQuery();
  useGetBudgetQuery();

  const currentBudget = useSelector(selectBudgetData);
  const userItems = useSelector(selectUserItems);
  const userGroups = useSelector(selectAllGroups);
  const dueDate = useSelector(selectDueDate);

	const monetaryUnit = currentBudget ? currentBudget.monetaryUnit : '$';
	const totalBudget = currentBudget ? currentBudget.totalBudget : 0;
  const budgetUpdatedAt = currentBudget ? currentBudget.budgetUpdatedAt : '';

  const [updateModal, setUpdateModal] = useState(false);	

  //Validation for rendering update budget modal
  useEffect(() => {
    const budgetUpdateDate = new Date(budgetUpdatedAt);
    const now = new Date();
    if(Number(dueDate) === Number(now.getDate()) && 
      now.getMonth() !== budgetUpdateDate.getMonth()) {
      setUpdateModal(true);
    }
  },[budgetUpdatedAt, dueDate, setUpdateModal])

  let totalExpenses = 0;
  return (
    <>
      <div className={`${styles.groupsContainer}`}>
        { 
          userGroups.length !== 0 ? userGroups.map((group, index) => {
            //Getting groups total budget and total expenses:
            let groupBudget = 0;
            let groupExpenses = 0;
            for(let item of userItems) {
              if(item.group === group.title){
                groupBudget += item.alocatedBudget;
                groupExpenses += item.expenses;
                totalExpenses += item.expenses;
              }
            }
            groupBudget = Math.round((groupBudget * 100) / 100).toFixed(2);
            groupExpenses = Math.round((groupExpenses * 100) / 100).toFixed(2);
            //---------------------------------------------------------------------------------------------
            return(
              <HomeExpensesCollapseComp
                key={`collapse${index}`} 
                group={group} 
                groupBudget={groupBudget} 
                groupExpenses={groupExpenses}
                userItems={userItems}
                index={index}
              />
            )
          }) : 
          <p className={`my-5 ${styles.noGroupsNotation}`}>
            Create your own list for expences ...
          </p>
        }

        { updateModal && <AlocateNewBudgetModal setUpdateModal={setUpdateModal}/> }

        <div className={styles.homeTotalBudgetContainer}>
        <HomeTotalBudgetComp totalExpenses={totalExpenses} 
          totalBudget={totalBudget} 
          monetaryUnit={monetaryUnit} 
        />
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  )
}

export default HomeExpencesComp
