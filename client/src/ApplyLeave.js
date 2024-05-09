import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import nodemailer from 'nodemailer';
import Validation from './LeaveValidation';

function ApplyLeave() {
    const [values, setValues] = useState({
        leaveStartDate: '',
        leaveEndDate: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!values.leaveStartDate || !values.leaveEndDate) {
            setErrors({ date: 'Please select both start and end dates.' });
        } else {
            const validationErrors = Validation(values, setErrors, submitLeaveRequest);
            setErrors(validationErrors);
            console.log('Submitting leave request:', values);
            if (Object.keys(validationErrors).length === 0) {
                submitLeaveRequest();
            }
        }
    };
    
    const submitLeaveRequest = () => {
        const leaveRequestData = {
            name: 'Gayatri',
            email: 'cgayatri@indiratrade.com',
            leaveStartDate: values.leaveStartDate,
            leaveEndDate: values.leaveEndDate
        };
        console.log('Sending leave request:', leaveRequestData)

        axios.post('http://localhost:4004/apply-leave', leaveRequestData)
            .then(res => {
                console.log('Leave request submitted successfully', res);
            })
            .catch(err => {
                console.error('Error submitting leave request:', err);
            });
    };  

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
           <div className='bg-white p-3 rounded w-25'>
              <h2>Apply For Leave</h2>
                   <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="leaveStartDate"><strong>Start Date</strong></label>
                    <input type="date" name="leaveStartDate" value={values.startDate} onChange={handleInput} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="leaveEndDate"><strong>End Date</strong></label>
                    <input type="date" name="leaveEndDate" value={values.endDate} onChange={handleInput} className='form-control rounded-0'/>
                </div>
                {errors.date && <p className="text-danger">{errors.date}</p>}
                <button type='submit' className='btn btn-success w-50 rounded-0 '><strong>Apply</strong></button>
            </form>
            <br />
            {/* <Link to="/dashboard/home">Back to Dashboard</Link> */}
        </div>
      </div>
    )
}
export default ApplyLeave;
