import React from 'react';
import { Routes, Route, BrowserRouter as Router } 
from 'react-router-dom'
import Landing from './pages/landing'
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/home'
import Category from './pages/category'
import FlowCharts from './pages/flowCharts'
import Profile from './pages/profile'
import Expenses from './pages/expenses'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/flow-charts' element={<FlowCharts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
