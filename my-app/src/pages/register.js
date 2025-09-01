//register for new user
import React, { useState } from 'react';

import './register.css';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        // Simulate an API call
        setTimeout(() => {
            if (username === '' || email === '' || password === '' || confirmPassword === '') {
                setError('All fields are required');
            } else if (password !== confirmPassword) {
                setError('Passwords do not match');
            } else if (password.length < 6) {
                setError('Password must be at least 6 characters');
            } else {
                setSuccess('Registration successful!');
                // Clear form fields

                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
            setLoading(false);
        }, 2000);
    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }
    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input

                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input

                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div className="password-input-container">
                        <input

                            type={showPassword ? 'text' : 'password'}

                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button

                            type="button"   
                            className="show-password-btn"
                            onClick={toggleShowPassword}
                            disabled={loading}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <div className="password-input-container">
                        <input

                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                        <button

                            type="button"
                            className="show-password-btn"
                            onClick={toggleShowConfirmPassword}
                            disabled={loading}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
}

export default Register;