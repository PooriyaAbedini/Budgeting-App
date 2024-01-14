import { useGetChartDataQuery, selectChartData } from '../features/Items/itemSlice'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import WeeklyChartComp from '../components/WeeklyChartComp'
import MonthlyChartComp from '../components/MonthlyChartComp'
import AnualChartComp from '../components/AnualChartComp'
import styles from '../styles/flowChart.module.css'

import Header from '../components/Header'


const FlowCharts = () => {
  const {isLoading, isSuccess, isError, error} = useGetChartDataQuery();

  const data = useSelector(selectChartData);
  const [barData, setBardata] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [anualData, setAnualData] = useState(null);
  const [monetaryUnit, setMonetaryUnit] = useState(null)

  useEffect(() => {
    if(data) {
      setBardata(data.weeklyData);
      setMonthlyData(data.monthlyData);
      setAnualData(data.anualData);
      setMonetaryUnit(data.weeklyData[0].monetaryUnit)
    }
  }, [setBardata, setMonthlyData, data])

  return (
    <>
      <div>
        <Header />
      </div>
      <div className={`${styles.weeklyContentContainer}`}>
        <div className={`${styles.titlesContainer}`}>
        <h4 className={`${styles.titles}`}>Weekly: </h4>
        </div>
        <div className={`${styles.charts}`}>
          <WeeklyChartComp data={barData} unit={monetaryUnit} />
        </div>
      </div>

      <div className={`${styles.MonthlyContentContainer}`}>
        <div className={`${styles.titlesContainer}`}>
        <h4 className={`${styles.titles}`}>Monthly: </h4>
        </div>
        <div className={`${styles.charts}`}>
          <MonthlyChartComp data={monthlyData} unit={monetaryUnit} />
        </div>
      </div>

      <div className={`${styles.AnualContentContainer}`}>
        <div className={`${styles.titlesContainer}`}>
        <h4 className={`${styles.titles}`}>Anual: </h4>
        </div>
        <div className={`${styles.charts}`}>
          <AnualChartComp data={anualData} unit={monetaryUnit} />
        </div>
      </div>
     

    </>
  )
}

export default FlowCharts
