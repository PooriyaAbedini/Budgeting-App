import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import { reset, login } from '../features/users/authSlice'
import loginPng from '../pics/login.png'
import styles from '../styles/login.module.css'


function Login() {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isError, isLoading, isSuccess, message } = useSelector(state => state.auth);

  useEffect( () => {
		if(isError) {
			toast.error(message);
		}
		if(isSuccess) {
			navigate('/home')
		}
		dispatch(reset());
  },[user, isError, isSuccess, message, dispatch, navigate]);

  const onSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const { email, password } = Object.fromEntries(formData);

		if(!email || !password) {
			toast.warn('Please fill all required fields!');
		}
		else {
			const userData = {
				email,
				password
			}
			dispatch(login(userData));
		}
  }

  if(isLoading) {
  }
  return (
    <>
			<ToastContainer />
			<div className={styles.container}>
				<form onSubmit={onSubmit} className={styles.form}>
					<div className={styles.heading}>
						<h2 className={styles.h2}><FaSignInAlt color='white' /> Login!</h2><br />
						<p className={styles.p}>Please fill the required fields!</p>
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<input type='email'
							className='form-control'
							id='email'
							name='email' 
							placeholder='Email address' />		
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<input type='password'
							className='form-control'
							id='password'
							name='password'
							placeholder='Password' />
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<button className='btn btn-success my-3 signup&login-btns' id='loginButton'>Login</button>
					</div>
					<div className={styles.notRegistered}>
						<p className={styles.p}>Not registered yet? <a href='/signup'>Signup!</a></p>	
					</div>
				</form>	
				<div className={styles.pngContainer}>
					<img className={styles.png} src={loginPng} alt='dolorInHand-login'/>
				</div>
			</div>
			
    </>
  )
}

export default Login
