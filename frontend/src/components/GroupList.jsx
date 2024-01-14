import { useGetItemGroupsQuery,
  useGetUserItemsQuery, 
  useAddItemMutation, 
  useDeleteGroupMutation,
  selectUserItems,
  selectAllGroups,
  useAddGroupMutation,
  selectBudgetData,
} from "../features/Items/itemSlice"
import { useSelector } from "react-redux"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify'
import GroupsCollapseCompCat from "./GroupsCollapseCompCat"
import styles from "../styles/category.module.css"

let limit = 0;

const GroupList = () => {

  useGetItemGroupsQuery();
  useGetUserItemsQuery();

  const userItems = useSelector(selectUserItems);
  const userGroups = useSelector(selectAllGroups);
  const budgetData =  useSelector(selectBudgetData)
  const totalBudget = Number(budgetData?.totalBudget);
  const monetaryUnit = budgetData?.monetaryUnit;

  
  let [addItem,{ 
    isLoading,
    isError,
    isSuccess,
    error
  }] = useAddItemMutation();
  const [addGroup] = useAddGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();

  const errorMessage = error ? error.data.message : '';

  //Alocated budget to items: 
  let itemsAlocatedBudgetSumation = 0;
  userItems.map(item => {
    return itemsAlocatedBudgetSumation += item.alocatedBudget
  })
  const budgetLeftToAlocate = totalBudget - itemsAlocatedBudgetSumation

  //groups title input control
  const [groupTitle, setGroupTitle] = useState('');
  const changeGroupTitle = (e) => {
    setGroupTitle(e.target.value)
  }

  //Add group
  const onCreateGroup = (e) => {
    e.preventDefault();
    const groupName = e.target.elements.groupTitle.value;
    addGroup({
      group: groupName
    });
    setGroupTitle('');
  }

  //Add instance
  const onAddInstance = async(e) => {
    e.preventDefault();
    let groupName = e.target.id;
    let formData = new FormData(e.currentTarget)
    let { newInstance, newInstanceAmount } = Object.fromEntries(formData);

    if(Number(newInstanceAmount) > budgetLeftToAlocate) {
      console.log('new: ' + newInstanceAmount, 'sum' + itemsAlocatedBudgetSumation, 'left: ' + budgetLeftToAlocate);
      toast.error(`It's more than your total budget!`)
      toast.warn(`${budgetLeftToAlocate}${monetaryUnit} left to alocate!`)
    }
    else {
      let item = {
        title: newInstance,
        alocatedBudget: newInstanceAmount,
        group: groupName,
      }      
      addItem(item)
      limit = 0;
      e.currentTarget.reset()
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if(isLoading) {
    toast.loading('Pending...',{
      toastId: 'pending'
    })
  }

  if(isSuccess) {
    toast.dismiss('pending')
    limit === 0 && toast.success('Added!');
    limit ++;
  }
  if(isError && limit === 0) { 
      toast.dismiss('pending');
      toast.error(errorMessage);
    limit++;
  }
  
  //Delete group
  const onDeleteGroup = (e) => {
    const groupName = e.currentTarget.name
    deleteGroup(groupName);
  }

  // let index = 0;

  return (
    <>
      <ToastContainer />
      <div>
        <h3 className={styles.title}>Create Your Expences Category:</h3>   
        <h5>alocated: {itemsAlocatedBudgetSumation + monetaryUnit}</h5>
        <h5>left: {totalBudget - itemsAlocatedBudgetSumation + monetaryUnit}</h5>
        <p>Create groups and add anstanses to each one, so you can track your expenses in each field. By
           alocating budget to each instanse in your groups, you are creating a deadline for your expenses
           in that field, so you can not spend more!</p>
      </div>
      <form className={styles.groupsForm} onSubmit={onCreateGroup}>
        <div className={`input-group mb-3`}>
          <div className={`input-group-prepend`}>
            <span className={`input-group-text rounded-end-0`}>Create Groups</span>
          </div>
          <input type="text"
                  className={`form-control ${styles.formControl}`}
                  name="groupTitle" 
                  value={groupTitle ? groupTitle : ''}
                  onChange={changeGroupTitle}
                  placeholder="group name" 
                  aria-label="Recipient's username" 
                  aria-describedby="basic-addon2" />
          <div className="input-group-append">
            <button className={`btn btn-outline-secondary rounded-start-0`} 
              type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
      <div className={`${styles.userGroups}`}>
        { userGroups.length !== 0 ? userGroups.map((group, index) => {
          return(
            <GroupsCollapseCompCat key={index} 
              group={group} 
              index={index} 
              userItems={userItems}
              onAddInstance={onAddInstance}
              onDeleteGroup={onDeleteGroup}
            />
          )
          }) : <p className={`my-5 ${styles.notation}`}>Add new groups ...</p>
        }
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

export default GroupList
