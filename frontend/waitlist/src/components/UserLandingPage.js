import React, { useState, useEffect } from 'react';
import './UserLandingPage.css';
import { useLocation } from 'react-router-dom';

const UserLandingPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [waitlist, setWaitlist] = useState(null);
  const name = params.get('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("param: " + name )
        const waitlistResponse = await fetch(`https://startupwaitlist-production.up.railway.app/pages?name=${name}`, {});
        // const waitlistResponse = await fetch(`http://127.0.0.1:8000/pages?name=test123`, {});


        if (waitlistResponse.ok) {
          const waitlistData = await waitlistResponse.json();
          setWaitlist(waitlistData);
          console.log("Data: " + waitlistData)
        } else {
          setError('Error fetching waitlist');
        }

      } catch (error) {
        setError('Error during fetching waitlist: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Send the email to startupwaitlist-production.up.railway.app
    try {
      console.log(`sending email: ${email}, waitlist_id: ${waitlist.id}`);
      const response = await fetch('https://startupwaitlist-production.up.railway.app/pages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          waitlistId: waitlist.id, // Replace with the actual waitlist ID
        }),
      });

      if (response.ok) {
        // Email sent successfully
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="landing-page">
      {/* Check if the data is fetched and waitlist is not null */}
      {waitlist && (
        <>
          <h1 className="headline">{waitlist.headline}</h1>
          <h2 className="subheadline">{waitlist.subheadline}</h2>
          <div className="call-to-action">
            <p>{waitlist.cta}</p>
            <div className="email-form">
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
            <div className="youtube-video">
              <iframe
                width="560"
                height="315"
                src={waitlist.hero_url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </>
      )}

      {/* Show loading message while data is being fetched */}
      {loading && <p>Loading...</p>}

      {/* Show error message if there's an error */}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UserLandingPage;
