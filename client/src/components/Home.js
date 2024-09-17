import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Home = () => {

  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalEmp, setTotalEmp] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [admins, setAdmins] =useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, [])

  const adminCount = () => {
    axios.get('http://localhost:2000/auth/countAdmin')
    .then(result => {
      if(result.data.Status){
        setTotalAdmin(result.data.Result[0].admin) 
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  }

  const employeeCount = () => {
    axios.get('http://localhost:2000/auth/countEmp')
    .then(result => {
      if(result.data.Status){
        setTotalEmp(result.data.Result[0].employee) 
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  }

  const salaryCount = () => {
    axios.get('http://localhost:2000/auth/countSalary')
    .then(result => {
      if(result.data.Status){
        setTotalSalary(result.data.Result[0].salary) 
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  }

  const adminRecords = () => {
    axios.get('http://localhost:2000/auth/adminRec')
    .then(result => {
      if(result.data.Status){
        setAdmins(result.data.Result) 
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Addmin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : </h5>
            <h5>{totalAdmin}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : </h5>
            <h5>{totalEmp}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total : </h5>
            <h5>${totalSalary}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List Of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map(admin => (
                <tr>
                  <td>{admin.email}</td>
                  <td>
                    <button className='btn btn-info btn-sm me-2'>Edit</button>
                    <button className='btn btn-warning btn-sm'>Delete</button>
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

export default Home;