import { useState, useRef, useEffect } from 'react'
import { BsChevronCompactDown, BsXLg, BsPlusLg } from "react-icons/bs"
import GroupInstances from './GroupInstances'
import styles from "../styles/category.module.css"


const GroupsCollapseCompCat = ({group, index, userItems, onDeleteGroup, onAddInstance}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapseHeight, setCollapseHeight] = useState(0);

  const ref = useRef(null);

  const showInstances = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    ref.current && setCollapseHeight(ref.current.clientHeight)
  }, [userItems])

  return (
    <>
      <div key={index} className={`${styles.card} card mb-2`} style={{ width: '30rem' }}>
        <div className="input-group card-header">
          <input type="text" 
            key={index}
            className={`form-control  ${styles.formControl}`} 
            placeholder="group name" 
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2" 
            value={group.title}
            name="groupName"
            disabled
          /> 
          <div className={`${styles.cardHeader} input-group-append`}>
            <button className={`btn btn-outline-secondary rounded-0`} 
              id={index}
              key={index}
              type="button"
              onClick={showInstances}
            >
              Edit {
                <BsChevronCompactDown /> 
              }
            </button>
          </div>
          <div className={`${styles.cardHeader} input-group-append`}>
            <button className={`btn btn-outline-secondary rounded-start-0`} 
              name={group.title}
              type="button"
              onClick={onDeleteGroup}>
              <BsXLg  />
            </button>
          </div>
        </div>
        <div id={`ul${index}`} 
          style={{height: isOpen ? collapseHeight + 30 : '0px'}} 
          className={`${styles.dropDownContent} list-group`}> 
          <div ref={ref}>
            <form className="input-group card-header" id={group.title} onSubmit={onAddInstance}>
              <input className={`form-control rounded-end-0`}
                key={`input${index}`}
                id={group.title}
                name='newInstance' 
                type="text"
                placeholder="New instance title" 
              />
              <input className={`form-control rounded-end-0`}
                key={`amountInput${index}`}
                id={group.title}
                name='newInstanceAmount' 
                type="text"
                placeholder="Alocate budget" 
              />
              <div className={`${styles.cardHeader} input-group-append`}>
                <button className={`btn btn-outline-secondary rounded-start-0`} 
                  type="submit"
                >
                  <BsPlusLg />
                </button>
              </div>
            </form>
            <div className={`${styles.groupInstansesContainer}`}>
            <GroupInstances key={ index } groupName={ group.title } items={ userItems }/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GroupsCollapseCompCat
