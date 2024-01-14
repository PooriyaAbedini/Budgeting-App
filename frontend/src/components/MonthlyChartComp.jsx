import { 
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Tooltip,
  Area,
  XAxis,
  YAxis, 
} from 'recharts'
import { format } from 'date-fns'
import { useState, useEffect } from 'react'
import styles from '../styles/flowChart.module.css'

const MonthlyChartComp = ({ data, unit }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if(data){
      setChartData(data)
    }
  }, [data, setChartData])
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <>
      <ResponsiveContainer width="80%" height={400}>
        <AreaChart data={data} width="100%">
          <defs>
            <linearGradient id='color' x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor='#386641' stopOpacity={1}></stop>
              <stop offset="75%" stopColor='#386641' stopOpacity={0.2}></stop>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="expense" stroke='#386641' fill='url(#color)'/>
          <XAxis dataKey={`date`} 
            tickLine={false} 
            tickFormatter={date => {
              return (format(date, 'd'))
            }}
          />
          <YAxis dataKey={`expense`} />
          <Tooltip cursor={{opacity: '0.1'}} content={data && <CustomTooltip unit={unit} />} />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}

function CustomTooltip({ active, payload, label, unit }) {
  const date = new Date(label)
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

export default MonthlyChartComp
