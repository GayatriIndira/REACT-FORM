function Validation(values, setErrors, submitLeaveRequest) {
    const currentDate = new Date();
    const selectedStartDate = new Date(values.leaveStartDate);
    const selectedEndDate = new Date(values.leaveEndDate);

    if (selectedStartDate > currentDate && selectedEndDate > selectedStartDate) {
        // Dates are valid
        return {};
    } else {
        // Dates are not valid, return error message
        return {
            date: 'Invalid dates. Please select valid start and end dates.'
        };
    }
}

export default Validation;