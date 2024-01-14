import { useGetBudgetQuery,
  useUpdateBudgetMutation,
  selectBudgetData,
  useGetDueDateQuery,
} from '../features/Items/itemSlice';	
import { useSelector } from 'react-redux';
import styles from '../styles/category.module.css'


const TotalBudget = () => {
 


	//Fetch and select required data
  useGetDueDateQuery();
	useGetBudgetQuery();
  const [updateBudget] = useUpdateBudgetMutation();
  const currentBudget = useSelector(selectBudgetData)

	const monetaryUnit = currentBudget ? currentBudget.monetaryUnit : '$';
	const totalBudget = currentBudget ? currentBudget.totalBudget : 0;

	//Alocate total budget
	const onSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { monetaryUnit, budgetAmount } = Object.fromEntries(formData);
		const budget = {
      monetaryUnit,
      budgetAmount
		}

		updateBudget(budget);
		if(updateBudget) {
			formData.set('budgetAmount', 0)
			e.currentTarget.reset()
		}
	}


  return (
    <div> 
      <h3 className={styles.title}>Totla budget alocation: </h3>
      <h5>Current Budget: {`${totalBudget} ${monetaryUnit}`}</h5>
      <p>Every month you should alocate your considered total budget for your expenses,
        then you can manage your expense groups and their instanses by alocating a part of
        this budget to each one of them. if you update your total budget all your settings 
        for the groups will be lost, but you can access your expenses in expenses page.
      </p>
			<form className={styles.groupsForm} onSubmit={onSubmit}>
				<div className={`input-group mb-3`}>
					<div className={`input-group-prepend`}>
            <select className={`form-select rounded-end-0`} name="monetaryUnit" id="units">
              <option value="$">$</option>
              <option value="€">€</option>
              <option value="Rls">Rls</option>
              <option value="¥">¥</option>
            </select>
					</div>
					<input type="text"
            className={`form-control ${styles.formControl}`}
            name="budgetAmount" 
            placeholder="Total budget" 
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2" />
					<div className="input-group-append">
            <button className={`btn btn-outline-secondary rounded-start-0`} 
            type="submit">
            Alocate
            </button>
					</div>
				</div>
			</form>
    </div>
  )
}

export default TotalBudget
