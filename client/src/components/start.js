import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
    const navigate = useNavigate();
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h1 className='text-center'>Log In</h1>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                    <button type='button' className='btn btn-primary' onClick={() => {navigate('/employee_login')}}>
                        Employee
                    </button>
                    <button type='button' className='btn btn-success' onClick={() => {navigate('/admin_login')}}>
                        Admin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Start