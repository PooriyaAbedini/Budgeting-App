import {
  useUpdateBudgetMutation
} from '../features/Items/itemSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsXLg } from "react-icons/bs"
import { toast, ToastContainer } from 'react-toastify'
import styles from '../styles/home.module.css'


let limit = 1;
let reloaded = 0;

const AlocateNewBudgetModal = (props) => {

  const navigate = useNavigate();

  const [updateBudget, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateBudgetMutation();

  const onUpdateBudget = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBudget = Object.fromEntries(formData);
    const { budgetAmount } = newBudget;
    if(!budgetAmount) {
      toast.error('Enter your new estimated budget!')
    }
    else {
      updateBudget(newBudget);
      reloaded = 0;
    }
  }
  useEffect(() => {
    if(isLoading) {
      toast.loading('Pending...', {
        toastId: 'pending'
      })
    }
    if(isError) {
      toast.dismiss('pending')
      toast.error('error')
    }
    if(isSuccess) {
      toast.dismiss('pending');
      reloaded < 1 && toast.success('Total budget updated!');
      reloaded < 1 && toast.success('You will be navigated to category page to alocate your groups budget')
      reloaded++;
      setTimeout(() => {
        navigate('/category')
      }, 5000)
      
    }
  })
  return (
    <>
		<ToastContainer />
    <div className={`${styles.modalBackground}`}>
      <div className={`${styles.modalContainer}`}>
          <button type="button" 
            className={`${styles.closeButton} btn btn-outline-danger btn-sm`}
            onClick={() => props.setUpdateModal(false)}
          > 
            <BsXLg /> 
          </button>
          <form className={`${styles.modalForm} mb-3`} onSubmit={onUpdateBudget}>
            <h3>Alocate budget for this month!</h3>
            <br />
            <div className={`${styles.modalFormInputs} input-group`}>
              <div className={`input-group-prepend`}>
                <select className={`form-select rounded-end-0`} name="monetaryUnit" id="units">
                  <option value="$">$</option>
                  <option value="€">€</option>                  
                  <option value="¥">¥</option>
                  <option value="Rls">Rls</option>
                </select>
              </div>
              <input 
                name="budgetAmount"
                type="number"
                step={0.01}
                placeholder="0.00"
                className={`form-control`}
              />
            </div>
            <div className={``}>
              <button type='submit' 
                className={`btn btn-outline-success mt-3`}
              > Alocate</button>
            </div>
          </form>
        </div>
    </div>
	</>
  )
}

export default AlocateNewBudgetModal
