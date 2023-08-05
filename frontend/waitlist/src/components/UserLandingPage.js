import React, { useState, useEffect } from 'react';
import './UserLandingPage.css';
import { useLocation } from 'react-router-dom';

const UserLandingPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [waitlist, setWaitlist] = useState(null);
  const waitlistId = params.get('waitlistId');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const waitlistResponse = await fetch(`http://localhost:8000/pages/${waitlistId}`, {});

        if (waitlistResponse.ok) {
          const waitlistData = await waitlistResponse.json();
          setWaitlist(waitlistData);
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
  }, [waitlistId]);

  return (
    <div className="landing-page">
      {/* Check if the data is fetched and waitlist is not null */}
      {waitlist && (
        <>
          <h1 className="headline">{waitlist.headline}</h1>
          <h2 className="subheadline">{waitlist.subheadline}</h2>
          <div className="call-to-action">
            <p>{waitlist.cta}</p>
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
