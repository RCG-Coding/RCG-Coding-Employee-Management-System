import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddEmp = () => {

  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    salary:'',
    address:'',
    category_id:'',
    image:''
  })

  const navigate = useNavigate()

  useEffect(() =>{
    axios.get('http://localhost:2000/auth/getCat')
    .then(result => {
      if(result.data.Status){
        setCategory(result.data.Result)
        
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('password', values.password)
    formData.append('salary', values.salary)
    formData.append('address', values.address)
    formData.append('category_id', values.category_id)
    formData.append('image', values.image)

    axios.post('http://localhost:2000/auth/addEmp', formData)
    .then(result => {
      if(result.data.Status){
        navigate('/dashboard/employee')
      }else{
        alert(result.data.Error)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className='p-3 rounded w-75 border mt-3'>
            <div className='d-flex justify-content-center'>
            <h2 className='text-success'>Add Employee</h2>
            </div>
            
            <form className='row g-1' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <lable htmlfor='name' className='form-lable'>name</lable>
                    <input type='text' name='name' placeholder='Enter Name' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, name: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <lable htmlfor='email' className='form-lable'>Email</lable>
                    <input type='email' name='email' placeholder='Enter Email' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <lable htmlfor='password' className='form-lable'>Password</lable>
                    <input type='password' name='password' placeholder='Enter Password' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, password: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <lable htmlfor='salary' className='form-lable'>Salary</lable>
                    <input type='text' name='salary' placeholder='Enter Salary' autoComplete='off' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, salary: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <lable htmlfor='address' className='form-lable'>Address</lable>
                    <input type='text' name='address' placeholder='Enter Address' autoComplete='off' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, address: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <lable htmlfor='category' className='form-lable'>Category</lable>
                    <select name='category' id='category' className='form-select'
                    onChange={(e) => setValues({...values, category_id: e.target.value})}>
                      {category.map(cat => {
                        return <option value={cat.id}>{cat.name}</option>
                      })}
                    </select>
                </div>
                <div className='col-12 mb-3'>
                    <lable htmlfor='image' className='form-lable'>Select Image</lable>
                    <input type='file' name='image' className='form-control rounded-0' 
                    onChange={(e) => setValues({...values, image: e.target.files[0]})}/>
                </div>
                <div className='col-12'>
                <button type='submit' className='btn btn-primary w-100'>Add Employee</button>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default AddEmp;