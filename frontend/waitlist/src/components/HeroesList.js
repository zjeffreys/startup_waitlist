import React, { useEffect, useState } from 'react';

const HeroesList = () => {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    // Fetch heroes from the API
    fetch('http://localhost:8000/heroes')
      .then((response) => response.json())
      .then((data) => setHeroes(data))
      .catch((error) => {
        console.error('Error fetching heroes:', error);
      });
  }, []);

  return (
    <div>
      <h1>Heroes List</h1>
      <ul>
        {heroes.map((hero, index) => (
          <li key={index}>
            <strong>Name:</strong> {hero.name} <br />
            <strong>Alias:</strong> {hero.alias}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HeroesList;
