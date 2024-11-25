import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="nav-links">
            <button onClick={() => setActiveTab('products')}>
                <Link to="/dashboard">Product Management</Link>
            </button>
            <button onClick={() => setActiveTab('users')}>
                <Link to="/dashboard">User Management</Link>
            </button>
        </nav>
    );
};

export default Navigation;