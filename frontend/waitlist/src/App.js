import logo from './logo.svg';
import './App.css';
 

import HeroesList from './components/HeroesList'; // Import the component from the components directory

const App = () => {
  return (
    <div>
      <h1>My Superhero App</h1>
      <HeroesList /> {/* Use the imported HeroesList component */}
    </div>
  );
};

export default App;