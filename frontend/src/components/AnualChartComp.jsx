import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import styles from '../styles/flowChart.module.css'


const AnualChartComp = ({ data, unit }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if(data){
      setChartData(data)
    }
  }, [data, setChartData])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <>
      <ResponsiveContainer width='80%' height={400}>
        <LineChart data={chartData} width='100%'>
          <CartesianGrid opacity={0.1}/>
          <XAxis dataKey={`month`} 
            tickLine={false} 
            tickFormatter={date => {
              return (month[date])
            }}
          />
          <YAxis dataKey='expenses'/>
          <Tooltip cursor={{opacity: '0.1'}} content={data && <CustomTooltip unit={unit}/>}/>
          <Line type='monotone' dataKey='expenses' stroke='#386641' />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

function CustomTooltip({ active, payload, label, unit }) {
  const monthes = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  const year = new Date().getFullYear();
  if(active) {
    return (
      <div className={`${styles.tooltip}`}>
        <p>
          { `${year}, ${monthes[label]}`}
        </p>
        <h5>{`${unit}${payload[0].value}`}</h5>
      </div>
    )
  }
}

export default AnualChartComp
