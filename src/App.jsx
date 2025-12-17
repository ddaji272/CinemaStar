// src/App.jsx
import { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import BookingFlow from './pages/BookingFlow';
import Theaters from './pages/Theaters';
import Members from './pages/Members';
import Rules from './pages/Rules';

function App() {
  const [activeTab, setActiveTab] = useState('movies');

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return <BookingFlow />;
      case 'theaters':
        return <Theaters />;
      case 'members':
        return <Members />;
      case 'rules':
        return <Rules />;
      default:
        return <BookingFlow />;
    }
  };

  return (
    <div className="container">
      <header>
        <h1 
          style={{ cursor: 'pointer' }} 
          onClick={() => setActiveTab('movies')}
        >
          CINEMA STAR
        </h1>
      </header>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;