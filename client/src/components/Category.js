import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {

  const [data, setData] = useState([]);

  useEffect(() =>{
    axios.get('http://localhost:2000/auth/getCat')
    .then(result => {
      if(result.data.Status){
        setData(result.data.Result)
        
      }else{
        alert(result.data.Error)
      }
    }).catch(err => console.log(err));
  },[])

  return (
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to='/dashboard/add_cat' className='btn btn-success'>Add Category</Link>

      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(cat => (
                <tr>
                  <td>{cat.name}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default Category;