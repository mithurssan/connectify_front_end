import React, { useState } from "react";
import axios from "axios";

const AddUserButton = () => {
    const businessId = localStorage.getItem('business_id');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch(`http://127.0.0.1:5000/users/update/business/${username}`, {
            business_id: businessId
        })
            .then(function (response) {
                console.log(response.data);
                setMessage("User added to business.");
                setTimeout(() => {
                    setMessage('');
                }, 700);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response.status === 404) {
                    setMessage("User not found.");
                    setTimeout(() => {
                        setMessage('');
                    }, 700);
                } else {
                    setMessage('An error occurred.');
                }
            });
        setUsername("")
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
            />
            <button type="submit" >Add User to Business</button>
            {message && <p className="message">{message}</p>}
        </form>
    );
};

export default AddUserButton;
