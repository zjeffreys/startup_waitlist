import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = ({ handleGetStarted }) => {
  return (
    <div className="landing-page">
      <header className="hero">
        <div className="hero-content">
          <h1 className="title">Test your ideas fast. </h1>
          <p className="subtitle">
            Just tell us what your startup does, add a short video, and we create a landing page so you can begin collecting emails!
          </p>
          <div className="cta">
            <button className="cta-button" onClick={handleGetStarted}>Get Started</button> {/* Use handleGetStarted prop as onClick handler */}
          </div>
        </div>
        <div className="hero-video">
          <iframe
            src="https://www.youtube.com/embed/uwfav6xqBcI"
            title="Waitlist App Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </header>
      
      
    </div>
  );
};

export default LandingPage;
