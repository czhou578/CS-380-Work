import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Zones from './Zones';

function App() {
  return (
    <div className="App">
      <div className='headerbar'>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Zones />} />
      </Routes>
    </div>
  );
}

export default App;
