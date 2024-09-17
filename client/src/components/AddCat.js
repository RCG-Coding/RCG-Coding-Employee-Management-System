import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCat = () => {

    const [value, setValue] = useState();
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        console.log(value)
        e.preventDefault();
        axios.post('http://localhost:2000/auth/addCat', {value})
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/category')
            }else{
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-25 border'>
            
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div >
                    <lable htmlfor='category'><strong>Category :</strong></lable>
                    <input type='text' name='category' placeholder='Enter Category' className='form-control rounded-0' 
                    onChange={(e) => setValue(e.target.value)}/>
                </div>
                <button className='btn btn-success w-100 rounded-0 my-3'>Add Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCat;