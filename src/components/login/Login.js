import React, { useState } from 'react';
import './Login.css'; // Create this CSS file for styling
// import Popup from './Popup';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Signup successful
                console.log('User signed up successfully');
                // Redirect or show success message
            } else {
                // Signup failed
                console.error('Failed to sign up:', response.statusText);
                // Show error message to the user
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            // Show error message to the user
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <a href="#" onClick={() => setShowPopup(true)}>Sign up</a></p>
                </div>
                <div>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                                <span className="close" onClick={togglePopup}>&times;</span>
                                <h2>Sign Up</h2>
                                {/* Signup form goes here */}
                                <form onSubmit={handleNewUserSubmit}>
                                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                                    <button type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default Login;
