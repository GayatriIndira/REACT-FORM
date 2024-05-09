import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import nodemailer from 'nodemailer';
import Validation from './LeaveValidation';

function ApplyLeave() {
    const [values, setValues] = useState({
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values, setErrors, submitLeaveRequest);
        setErrors(validationErrors);
        console.log('Submitting leave request:', values);
    };

    const submitLeaveRequest = () => {
        const leaveRequestData = {
            leaveStartDate: values.startDate,
            leaveEndDate: values.endDate
        };
        console.log('Sending leave request:', leaveRequestData)

        axios.post('http://localhost:4004/leave-request', leaveRequestData)
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
                    <label htmlFor="startDate"><strong>Start Date</strong></label>
                    <input type="date" name="startDate" onChange={handleInput} className='form-control rounded-0'/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="endDate"><strong>End Date</strong></label>
                    <input type="date" name="endDate" onChange={handleInput} className='form-control rounded-0'/>
                </div>
                {errors.date && <p className="text-danger">{errors.date}</p>}
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Apply</strong></button>
            </form>
        </div>
      </div>
    )
}
export default ApplyLeave;
