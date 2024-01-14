import { 
  useSetMonthDaysRawDataMutation,
  useSetAnualRawDataMutation
} from '../features/Items/itemSlice'
import { useEffect } from 'react'
import Header from '../components/Header'
import HomeExpencesList from '../components/HomeExpencesList'
import styles from '../styles/home.module.css'

function Home() {
  const setMonthlyRawData = useSetMonthDaysRawDataMutation();
  const setAnualRawData = useSetAnualRawDataMutation();

  useEffect(() => {
    let today = new Date().getDate();
    let thisMonth = new Date().getMonth();
    if(today === 1) {
      setMonthlyRawData();
    }
    if(thisMonth === 0 && today === 1) {
      setAnualRawData();
    }
  },[setMonthlyRawData, setAnualRawData]);
  
  return (
    <div className='homePageContainer'>
      <div>
        <Header />
      </div>
      	<div>
			<section className={styles.forms2}>
				<div className={styles.groupCreator2}>
					<div className={styles.formContainer3}>
						<div className={styles.expencesListComponent4}>
							<HomeExpencesList />
						</div>
					</div>
				</div>
			</section>
      	</div>
    </div>  
  )
}

export default Home
