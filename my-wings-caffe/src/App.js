import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './myFiles/LoginForm';
import SignupForm from './myFiles/SignupForm';
import Dashboard from './myFiles/Dashboard';
import ProductManagement from './myFiles/ProductManagement';
import UserManagement from './myFiles/UserManagement';
import './myFiles/Style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const App = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [currentUser, setCurrentUser] = useState(null);

    // Example stock data and images to pass as props
    const stockData = [
        { name: 'Product A', quantity: 120 },
        { name: 'Product B', quantity: 85 },
        { name: 'Product C', quantity: 60 },
        { name: 'Product D', quantity: 150 }
    ];

    const images = [
        'image/banana.jpg',
        'image/orange.jpg',
        'image/chips.jpg',
        'image/drink.jpg',
        'image/biscuts.jpg',
        'image/meat.jpg',
    ];

    const totalProducts = stockData.reduce((total, product) => total + product.quantity, 0);

    const handleLogin = (username, password) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            setCurrentUser(user);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleSignup = (username, password) => {
        if (users.find(u => u.username === username)) {
            alert('Username already exists');
        } else {
            const updatedUsers = [...users, { username, password }];
            setUsers(updatedUsers);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            alert('Signup successful! You can now log in.');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    return (
        <Router>
            <div className="auth-container">
                <div className="auth-options">
                    <Link to="/login" className="auth-option">Login</Link>
                    <Link to="/signup" className="auth-option">Signup</Link>
                </div>
                <Routes>
                    <Route path="/signup" element={currentUser ? <Navigate to="/dashboard" /> : <SignupForm onSignup={handleSignup} />} />
                    <Route path="/login" element={currentUser ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />} />
                    <Route
                        path="/dashboard"
                        element={currentUser ? <Dashboard totalProducts={totalProducts} stockData={stockData} images={images} onLogout={handleLogout} /> : <Navigate to="/login" />}
                    />
                    <Route path="/ProductManagement" element={currentUser ? <ProductManagement /> : <Navigate to="/login" />} />
                    <Route path="/UserManagement" element={currentUser ? <UserManagement /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
