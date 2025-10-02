// frontend/src/pages/AboutUs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css'; 

const AboutUs = () => {
  // State to hold the data fetched from the backend
  const [aboutData, setAboutData] = useState(null);
  // A state to handle the loading period
  const [loading, setLoading] = useState(true);

  // This useEffect hook runs once when the component is first rendered
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        // We ask our backend for the data at the '/about' endpoint
        // Note: Make sure you have a proxy in package.json or use the full URL
        const response = await axios.get('http://localhost:3000/aboutus');
        setAboutData(response.data); // Store the received data in our state
      } catch (error) {
        console.error("There was an error fetching the About Us data:", error);
      } finally {
        setLoading(false); // Stop showing the loading message
      }
    };

    fetchAboutData();
  }, []); // The empty array ensures this effect runs only one time

  // Show a loading message while we wait for the data
  if (loading) {
    return <div className="loading">Loading page content...</div>;
  }

  // If data wasn't fetched for some reason, show an error
  if (!aboutData) {
    return <div className="error">Failed to load content. Please try again later.</div>;
  }

  // Once data is loaded, display it!
  return (
    <div className="about-container">
      <h1>{aboutData.title}</h1>
      <div className="about-content">
        <img src={aboutData.imageUrl} alt="Ellen Wong" className="about-photo" />
        <div className="about-text">
          {aboutData.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;