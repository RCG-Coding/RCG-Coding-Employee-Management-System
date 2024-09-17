import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = () => {

  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:2000/auth/getEmp')
    .then(result => {
      if(result.data.Status){
        setData(result.data.Result)
        
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  },[])

  const handleDelete = (id) => {
    axios.delete('http://localhost:2000/auth/delEmp/'+id)
    .then(result => {
      if(result.data.Status){
        window.location.reload();
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to='/dashboard/add_emp' className='btn btn-success'>Add Employee</Link>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>address</th>
              <th>salary</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(emp => (
                <tr>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.address}</td>
                  <td>{emp.salary}</td>
                  <td>
                    <Link to={'/dashboard/edit_emp/'+ emp.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                    <button className='btn btn-warning btn-sm' onClick={() => handleDelete(emp.id)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee;