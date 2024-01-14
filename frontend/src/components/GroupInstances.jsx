import { 
	useDeleteItemMutation,
  useUpdateItemMutation,
  selectBudgetData
} from "../features/Items/itemSlice"
import { useSelector } from "react-redux"
import { toast, ToastContainer } from 'react-toastify'
import { BsXLg } from 'react-icons/bs'
import styles from "../styles/category.module.css"
import { useEffect } from "react"

const GroupInstances = (props) => {
	const budgetData = useSelector(selectBudgetData);
  const monetaryUnit = budgetData && budgetData.monetaryUnit;
	const [deleteItem, {
    isLoading: isDeleting,
    isSuccess: isDeleted,
    isError: isDeleteError,
    error: deleteError
  }] = useDeleteItemMutation();
  let [updateItem, {
    isLoading : isUpdating,
    isSuccess : isUpdated,
    isError : isUpdateError,
    error : updateError
  }] = useUpdateItemMutation();
	//Delete Instance
	const onDeleteInstance = (e) => {
		const itemId = e.currentTarget.id;
		deleteItem(itemId) && toast.success('Deleted!');
	}

  let updateErrorMessage = updateError ? updateError.data.message : '';
  let deleteErrorMessage = deleteError ? deleteError.data.message : '';
	//Update Instance
	const onUpdateInstance = (e) => {
		e.preventDefault();

		const itemId = e.currentTarget.id;
		const formData = new FormData(e.currentTarget);
		const  { amountInput } = Object.fromEntries(formData);
		
		const itemToUpdate = {
			id: itemId,
			alocatedBudget: amountInput
		}
		updateItem(itemToUpdate);
	}
  //Toasts
  useEffect(() => {
    if(isUpdating) {
      toast.loading('pending...', {
        toastId: 'pending'
      })
    }
    if(isUpdated) {
      toast.dismiss('pending');
      toast.success('Updated!');
    }
    if(isUpdateError) {
      toast.error(updateErrorMessage);
    }
    if(isDeleting) {
      toast.loading('pending...', {
        toastId: 'deletePending'
      })
    }
    if(isDeleted) {
      toast.dismiss('deletePending');
      toast.success('Deleted!');
    }
    if(isDeleteError) {
      toast.error(deleteErrorMessage);
    }
  },[isUpdating, isUpdated, isUpdateError, updateErrorMessage,
    isDeleting, isDeleted, isDeleteError, deleteErrorMessage])

  return (
    <>
      <ToastContainer />
      {
				props.items?.map(item => {
					if (item.group === props.groupName && item.title !== 'Sample') {
						return (
							<div id={item._id} key={item._id} className="list-group-item">
								<form className="input-group" id={item._id} onSubmit={onUpdateInstance} >
									<input className={`form-control`} 
										id={`input${item._id}`}
										key={item._id}
										name={`titleInput`} 
										type="text" 
										defaultValue={item.title}
										placeholder='title'
										disabled
									/>
									<input className={`form-control`} 
										id={`amount${item._id}`}
										key={`amount${item._id}`}
										name={`amountInput`} 
										type="text" 
										defaultValue={`${item.alocatedBudget}`}
										placeholder='amount'
									/>
                  <div className={`${styles.cardHeader} input-group-append`}>
                  <span className={`input-group-text rounded-0`}>{ monetaryUnit }</span>
                  </div>
                  <div className={`${styles.cardHeader} input-group-append`}>
                    <button className={`btn btn-outline-secondary rounded-0`} 
                      id={`updateBtn${item._id}`}
                      key={`updateBtn${item._id}`}
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
									<div className={`${styles.cardHeader} input-group-append`}>
										<button className={`btn btn-outline-secondary rounded-start-0`} 
														id={item._id}
														onClick={onDeleteInstance}
														type="button">
											<BsXLg  />
										</button>
									</div>
								</form>
							</div>
						)
					}
				})
			}
    </>
  )
}

export default GroupInstances
