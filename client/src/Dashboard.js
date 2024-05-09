import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    return (
        <div>
            <h2>Welcome to Dashboard!</h2>
            <p>Do you want to apply for leave?</p>
            <Link to="/apply-leave" className='btn btn-primary'>Apply for Leave</Link>
        </div>
    );
}

export default Dashboard;