import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './EditWaitlist.css';

const EditWaitlist = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const waitlistId = params.get('waitlistId');
    const [waitlist, setWaitlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token) {
                    const cleanedToken = token.replace(/^"(.*)"$/, '$1');
                    const waitlistResponse = await fetch(`http://localhost:8000/waitlists/${waitlistId}`, {
                        headers: {
                            'Authorization': `Token ${cleanedToken}`,
                        },
                    });

                    if (waitlistResponse.ok) {
                        const waitlistData = await waitlistResponse.json();
                        setWaitlist(waitlistData);
                    } else {
                        setError('Error fetching waitlist');
                    }
                }
            } catch (error) {
                setError('Error during fetching waitlist: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [waitlistId]);

    const [formState, setFormState] = useState({
        name: '',
        headline: '',
        subheadline: '',
        cta: '',
        heroImageOrVideoUrl: '',
    });

    useEffect(() => {
        if (waitlist) {
            // Populate the form with existing data
            console.log(waitlist)
            setFormState({
                name: waitlist.name,
                headline: waitlist.headline,
                subheadline: waitlist.subheadline,
                cta: waitlist.cta,
                heroImageOrVideoUrl: waitlist.hero_url,
            });
            setEmails(waitlist.emails);

        }
    }, [waitlist]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('Token not available');
                return;
            }
    
            const cleanedToken = token.replace(/^"(.*)"$/, '$1');
    
            const updatedWaitlist = {
                name: formState.name,
                headline: formState.headline,
                subheadline: formState.subheadline,
                cta: formState.cta,
                hero_url: formState.heroImageOrVideoUrl,
                emails: emails, // You might need to adjust this based on your data structure
            };
    
            const url = `http://localhost:8000/waitlists/${waitlistId}/update_waitlist/`;
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cleanedToken}`,
                },
                body: JSON.stringify(updatedWaitlist),
            });
    
            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('token', JSON.stringify(data.auth_token));
                console.log('Waitlist updated successfully');
                // You might want to navigate or perform other actions here
            } else {
                console.error('Waitlist update failed');
            }
        } catch (error) {
            console.error('Error during waitlist update:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className='waitlist-container'>
                <a href='/my-waitlists'>Back</a>
                <h2>Edit Waitlist</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
                    </label>
                    <label>
                        Headline
                        <input type="text" name="headline" value={formState.headline} onChange={handleInputChange} />
                    </label>
                    <label>
                        Subheadline
                        <input type="text" name="subheadline" value={formState.subheadline} onChange={handleInputChange} />
                    </label>
                    <label>
                        Call to Action
                        <input type="text" name="cta" value={formState.cta} onChange={handleInputChange} />
                    </label>
                    <label>
                        Hero Image or Video URL
                        <input type="text" name="heroImageOrVideoUrl" value={formState.heroImageOrVideoUrl} onChange={handleInputChange} />
                    </label>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
            <div className="waitlist-container">
                <h3>Emails:</h3>
                <ul>
                    {emails.map((email, index) => (
                        <li key={index}>{email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EditWaitlist;
