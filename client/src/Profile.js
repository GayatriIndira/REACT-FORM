import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


function Profile() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect the user to the login page
        // window.location.href = '/';
        navigate('/');
    };

    return (
        <div>
            <h2>User Profile</h2>
           
            <button onClick={handleLogout}>Logout</button>
           
            {/* <Link to="/" onClick={handleLogout}>Logout</Link> */}
        </div>
    );
}

export default Profile;
