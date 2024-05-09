import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LeaveValidation';
import Profile from './Profile';

function Dashboard() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const token = localStorage.getItem('token');

    // const handleLogout = () => {
    //     localStorage.removeItem('token');
    //     navigate('/');
    // };

    // const handleApplyLeave = () => {
    //     navigate('/apply-leave');
    // };

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25 text-center'>
            <h2>Welcome to Dashboard!</h2>
           
              
                <ul className="horizontal-menu">
                        <li><Link to="/dashboard/home">Home</Link></li>
                        <li><Link to="/apply">Apply</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </ul>
               
            {/* <p>Do you want to apply for leave?</p> */}
            {/* <Link to="/apply-leave" >Apply for Leave</Link> */}
            {/* <br />
            {token && (
                <button type='submit' onClick={handleLogout}>Logout</button>
            )}
            <Link to="/update-password" >Update Password</Link>
            <br /> */}
            </div>
            </div>
        </div>
            
    );
}

export default Dashboard;