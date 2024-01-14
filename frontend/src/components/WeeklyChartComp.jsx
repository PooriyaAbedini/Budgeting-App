import { 
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  YAxis, 
} from 'recharts'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import styles from '../styles/flowChart.module.css'

const WeeklyChartComp = ({data, unit}) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if(data){
      setChartData(data)
    }
  }, [data, setChartData])
  return (
    <>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={data} width="100%">
          <defs>
            <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor='#386641' stopOpacity={1}></stop>
              <stop offset="75%" stopColor='#386641' stopOpacity={0.2}></stop>
            </linearGradient>
          </defs>
          <Bar type="monotone" dataKey="expense" barSize={100} stroke='#386641' fill='url(#color)'/>
          <XAxis dataKey={`date`} 
            tickLine={false} 
            tickFormatter={date => {
              return (format(date, 'eeee'))
            }}
          />
          <YAxis dataKey={`expense`} />
          <Tooltip content={data && <CustomTooltip unit={unit}/>} cursor={{opacity: '0.009'}}/>
          <CartesianGrid opacity={0.1} vertical={false} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

function CustomTooltip({ active, payload, label, unit }) {
  const date = new Date(label);
  if(active) {
    return (
      <div className={`${styles.tooltip}`}>
        <p>
          {format(date, 'Y, LLLL, do')}
          <br />
          <small>{format(date, 'eeee')}</small>
        </p>
        <h5>{`${unit}${payload[0].value}`}</h5>
      </div>
    )
  }
}



export default WeeklyChartComp
