import { useState, useEffect, useRef} from 'react'
import { BsChevronCompactDown } from "react-icons/bs"
import HomeExpenceInstances from './HomeExpenceInstances'
import styles from "../styles/home.module.css"


const HomeExpensesCollapseComp = ({group, index, userItems, groupExpenses, groupBudget}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseHeight, setCollapseHeight] = useState(0);
  const ref = useRef(null);

  const showInstances = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }
  
  useEffect(() => {
    ref.current && setCollapseHeight(ref.current.clientHeight) &&
    console.log(ref.current.clientHeight);
  },[userItems])

  const spentPersentage = (groupExpenses, groupBudget) => {
    const leftBudget = groupBudget - groupExpenses;
    return leftBudget !== 0 ? 
      (Math.round(((groupExpenses / groupBudget) * 10000) / 100).toFixed(2)) : '0.00'
  }
  const leftBudget = groupBudget - groupExpenses;

  return (
    <>
      <div key={index} className={`${styles.cards} mb-3`} style={{ width: '65%' }}>
        <div className={`${styles.progressGroup} form-group row mb-2`}>
          <div className={`${styles.titleBox} mx-3`}>
            <span type="text" 
              key={`span${index}`}
              className={`${styles.lable}`}   
              value={group.title}
              name="groupName"
              disabled
            >
              {group.title}
            </span>
            <div key={`info${index}`} className={`${styles.sapnsDiv}`}>
              <p className={`${styles.p}`}>total: {Number(groupExpenses) + Number(leftBudget)}</p>
              <p className={`${styles.p}`}>spent: { groupExpenses }</p>
              <p className={`${styles.p}`}>left: { leftBudget }</p>
            </div>
          </div>
          <div key={`meterDiv${index}`} className={`${styles.progressBox}`} style={{ height: '40px' }}>
            <div className={`${styles.progress}`} style={{ height: '10px' }}>
              <meter className={`${styles.meter}`} 
                id={`meter${index}`} 
                min={0} 
                max={groupBudget} 
                low={groupBudget * 7 / 10}
                high={groupBudget * 9 /10}
                value={groupExpenses} />
                <span>% { spentPersentage(groupExpenses, groupBudget) }</span>
            </div>
          </div>
          <div className={`${styles.buttonBox}`}>
            <button 
              className={`btn`} 
              id={index}
              key={index}
              type="button"
              onClick={showInstances}
            >
              {
                <BsChevronCompactDown color='white' /> 
              }
            </button>
          </div>
        </div>
        <div id={`ul${index}`}
          key={`ul${index}`} 
          className={`${styles.dropDownContent} pb-0 list-group list-group-flush`}
          style={{ height: isOpen ? collapseHeight : '0px' }}
        >
            <div className={`${styles.HomeExpenceInstancesContainer}`} ref={ref}> 
              <HomeExpenceInstances key={index} groupName={ group.title } items={ userItems } />
            </div>
        </div>
      </div>
    </>
  )
}

export default HomeExpensesCollapseComp
