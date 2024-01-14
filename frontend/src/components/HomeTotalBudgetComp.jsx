import styles from '../styles/home.module.css'


const ExpencesList = ({totalBudget, totalExpenses, monetaryUnit }) => {
  return (
    <div>
      <div className={`${styles.totalBudgetCard} mb-5`}>
				<div className="card-body">
					<blockquote className={`${styles.budgetAmountBox} blockquote mb-0`}>
						<h5>{`${totalBudget} ${monetaryUnit}`}</h5>
					</blockquote>
					<br />
					<blockquote className={`blockquote`}>
						<p>Total Expenses: {Math.round((totalExpenses * 100) / 100).toFixed(2)}{monetaryUnit}</p> 
					</blockquote>
					<blockquote>
						<span><small>{ totalBudget - totalExpenses }{monetaryUnit } left </small></span>
					</blockquote>
					<div className={`${styles.homeTotalProgressBox}`} style={{ height: '40px' }}>
						<div className={`${styles.homeTotalProgress}`} style={{ height: '10px' }}>
							<meter className={`${styles.homeTotalMeter}`} 
								min={0} 
                max={totalBudget}
                low={totalBudget * 7 / 10} 
                high={totalBudget * 9 /10}
								value={totalExpenses} />
						</div>
					</div>
				</div>
			</div>		
    </div>
  )
}

export default ExpencesList
