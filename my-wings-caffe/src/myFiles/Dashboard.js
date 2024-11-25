import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Style for the container
const containerStyle = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const Dashboard = ({ totalProducts = 0, onLogout, stockData = [], images = [] }) => {
  const navigate = useNavigate();

  // Navigation function
  const onNavigate = (path) => {
    navigate(`/${path}`);
  };

  // Settings for the image carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={containerStyle}>
      <h2>Dashboard</h2>
      
      <p>Total Products: {totalProducts}</p>

      {/* Bar Chart for Stock Levels */}
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Image Carousel */}
      <div style={{ width: '50%', margin: '20px auto' }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index}`} style={{ width: '100%', height: '400px' }} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Dashboard Navigation Buttons */}
      <div className="Dashboard-buttons">
        <button className="btn" onClick={() => onNavigate('ProductManagement')}>Product Management</button>
        <button className="btn" onClick={() => onNavigate('UserManagement')}>User Management</button>
        <button className="btn logout" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
