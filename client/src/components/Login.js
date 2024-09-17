import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState();

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(values)
        axios.post('http://localhost:2000/auth/login', values)
        .then(result => {
            if(result.data.loginStatus){
                navigate('/dashboard');
            }else{
                setError(result.data.Error)
            }
            
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-warning'>
                {error}
            </div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div >
                    <lable htmlfor='email'><strong>Email :</strong></lable>
                    <input type='email' name='email' autoComplete='off' placeholder='Enter Email' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className='my-3'>
                    <lable htmlfor='password'><strong>Password :</strong></lable>
                    <input type='password' name='password' placeholder='Enter Password' className='form-control rounded-0'
                    onChange={(e) => setValues({...values,password: e.target.value})} />
                </div>
                <button className='btn btn-success w-100 rounded-0 my-2'>LogIn</button>
                <div>
                    <input type='checkbox' name='check' />
                    <lable htmlfor='check'> You are agree with conditions</lable>  
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login;