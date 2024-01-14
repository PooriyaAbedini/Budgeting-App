import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, register } from '../features/users/authSlice'
import { FaUserAlt} from 'react-icons/fa'
import { toast, ToastContainer} from 'react-toastify'
import { 
  useSetMonthDaysRawDataMutation,
  useSetAnualRawDataMutation
} from '../features/Items/itemSlice'
import signupPng from '../pics/Signup.png'
import styles from '../styles/signup.module.css'


function Signup() {

	const dispatch = useDispatch();
	const navigate = useNavigate();
  const setAnualRawData = useSetAnualRawDataMutation();
  const setMonthlyRawData = useSetMonthDaysRawDataMutation()

	const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

	useEffect( () => {
		if(isError) {
			toast.error(message);
		}
		if(isSuccess) {
			navigate('/home')
      setMonthlyRawData();
      setAnualRawData();
		}
		dispatch(reset());
	}, [user, isError, isSuccess, message, dispatch, navigate]);

	const onSubmit = async(e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const { name, email, password, password2 } = Object.fromEntries(formData);

		if(!password || !password2 || !email || !name) {
			toast.warn('Please fill all required fildes!')
		}
		else if(password !== password2) {
			toast.warn('Passwords do not match!');
		}
		else {
			const userData = {
				name,
				email,
				password
			}
		 	dispatch(register(userData));
		}
	}

	// if(isLoading) { 

	// }
  return (
	<>
		<ToastContainer />
		<div className={styles.container}>
			<div className={styles.content}>
				<form className={styles.form} onSubmit={onSubmit}>
					<div className={styles.heading}>
						<h2 className={styles.h2}><FaUserAlt color='white'/> Sign Up!</h2><br />
						<p className={styles.p}>Please fill the required fields!</p>
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<input type='text'
							className='form-control'
							id='name'
							name='name'
							placeholder='Username' />		
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
							defaultValue={''}
							placeholder='Password' />
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<input type='password'
							className='form-control'
							id='password2'
							name='password2'
							defaultValue={''}
							placeholder='Confirm password' />
					</div>
					<div className={`${styles.formGroup} form-group`}>
						<button className={`btn btn-success my-3`} 
							id='loginButton'
							type='submit'>Sign Up
						</button>
					</div>
					<div className={styles.alreadySigned}>
					<p className={styles.p}>Already have an account? <a href='/login'>Login!</a></p>	
					</div>
				</form>	
			</div>
			<div className={styles.pngContainer}>
				<img className={styles.png} src={signupPng} alt='dolarInHand-signup' />
			</div>
		</div>
	</>
  )
}

export default Signup
