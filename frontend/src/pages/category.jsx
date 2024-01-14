import GroupList from '../components/GroupList'
import Header from '../components/Header'
import TotalBudget from '../components/TotalBudget'
import SetBudgetAlocationDueDate from '../components/SetBudgetAlocationDueDate'
import styles from '../styles/category.module.css'

const Category = () => {
  return (
    <>
			<div>
				<Header />
			</div>
      <div className={`${styles.flexContainer}`}>
        <div className={`${styles.container1} mr-5`}>
          <section className={styles.forms}>
                <div className={styles.totalBudgetComponent}>
                  <SetBudgetAlocationDueDate />
                </div>
          </section>
        </div>
        <div className={`${styles.container2}`}>
          <section className={styles.forms}>
                <div className={styles.totalBudgetComponent}>
                  <TotalBudget />
                </div>
          </section>
        </div>
      </div>
      <div className={`${styles.container3}`}>
        <section className={styles.forms}>
              <div className={styles.groupsComponent}>
                <GroupList />
              </div>
        </section>
      </div>
    </>
  )
}

export default Category
