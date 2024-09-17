import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditEmp = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        category_id: ''
    });

    useEffect(() => {
        axios.get('http://localhost:2000/auth/getCat')
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));

        axios.get('http://localhost:2000/auth/employee/' + id)
            .then(result => {
                setValues(prevValues => ({
                    ...prevValues,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    salary: result.data.Result[0].salary,
                    address: result.data.Result[0].address,
                    category_id: result.data.Result[0].category_id
                }));
            }).catch(err => console.log(err));

    }, [id]); 
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:2000/auth/edit_emp/' + id, values)
            .then(result => {
                if(result.data.Status){
                    alert(result.data.Result)
                    navigate('/dashboard/employee')
                }else{
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err));
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 rounded w-75 border mt-3'>
                <div className='d-flex justify-content-center'>
                    <h2 className='text-success'>Edit Employee</h2>
                </div>

                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='col-12'>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input type='text' name='name' value={values.name} placeholder='Enter Name' className='form-control rounded-0'
                            onChange={(e) => setValues({ ...values, name: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' name='email' value={values.email} placeholder='Enter Email' className='form-control rounded-0'
                            onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='salary' className='form-label'>Salary</label>
                        <input type='text' name='salary' value={values.salary} placeholder='Enter Salary' autoComplete='off' className='form-control rounded-0'
                            onChange={(e) => setValues({ ...values, salary: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>Address</label>
                        <input type='text' name='address' value={values.address} placeholder='Enter Address' autoComplete='off' className='form-control rounded-0'
                            onChange={(e) => setValues({ ...values, address: e.target.value })} />
                    </div>
                    <div className='col-12'>
                        <label htmlFor='category' className='form-label'>Category</label>
                        <select name='category' id='category' className='form-select'
                            value={values.category_id} // Ensure correct value is selected
                            onChange={(e) => setValues({ ...values, category_id: e.target.value })}>
                            <option value="">Select Category</option>
                            {category.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100'>Edit Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmp;
