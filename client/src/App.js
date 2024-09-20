import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/adminLogin';
import EmployeeLogin from './components/employeeLogin';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DashBoard from './components/DashBoard';
import Home from './components/Home';
import Employee from './components/Employee';
import Category from './components/Category';
import Profile from './components/Profile';
import Logout from './components/Logout';
import AddCat from './components/AddCat';
import AddEmp from './components/AddEmp';
import EditEmp from './EditEmp';
import Start from './components/start';
import EmployeeDetails from './components/employeeDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Start/>} />
          <Route path='/admin_login' element={<AdminLogin/>} />
          <Route path='/employee_login' element={<EmployeeLogin/>} />
          <Route path='/dashboard' element={<DashBoard/>}>
            <Route path='' element={<Home />}></Route>
            <Route path='employee' element={<Employee />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='category' element={<Category />}></Route>
            <Route path='logout' element={<Logout />}></Route>
            <Route path='add_cat' element={<AddCat />}></Route>
            <Route path='add_emp' element={<AddEmp />}></Route>
            <Route path='edit_emp/:id' element={<EditEmp />}></Route>
            <Route path='employeeDetail/:id' element={<EmployeeDetails />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
