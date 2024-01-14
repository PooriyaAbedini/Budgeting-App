import React from 'react'
import landingImg from '../pics/landing.png'
import styles from '../styles/landing.module.css'
import { useNavigate } from 'react-router-dom'


function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pngContainer}>
          <img src={landingImg} className={styles.png} alt='money-in-hand-guy'/>          
        </div>
        <div>
          <div className={styles.content}>
            <h1 style={{fontSize:"calc(1vw*10)"}} className={`${styles.h3}`}>Penny!</h1>
            <h3 style={{fontSize:"calc(1vw*2.5)"}} className={`${styles.h3}`}>Count your expenses</h3>
            <p style={{fontSize:"calc(1vw*1.8)"}} className={`${styles.p}`}>Even a penny...</p>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => navigate('/signup')} 
              className={`${styles.button} btn me-1`}
              style={{backgroundColor: '#e9ecef'}}>
              Sign Up!
            </button>
            <button onClick={() => navigate('/login')} 
              className={`${styles.button} btn ms-1`}
              style={{backgroundColor: '#e9ecef'}}>
              Login!
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
