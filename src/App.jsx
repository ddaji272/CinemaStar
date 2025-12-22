// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- 1. IMPORT ADMIN DASHBOARD ---
import AdminDashboard from './pages/AdminDashboard'; 

import BookingFlow from './pages/BookingFlow'; 
import Theaters from './pages/Theaters';       
import Members from './pages/Members';         
import Rules from './pages/Rules';             

function App() {
  const [activeTab, setActiveTab] = useState('phim');

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user_info");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleUserChange = (user) => {
    setCurrentUser(user);
    // Nếu login là admin thì ở lại trang member để bấm nút quản lý
    // Nếu là khách thì chuyển về đặt vé
    if (user && user.role !== 'admin') {
        setActiveTab('phim'); 
    }
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-right" autoClose={3000} hideProgressBar={false}
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss
        draggable pauseOnHover theme="dark"
      />

      <header>
        <h1 className="logo">CINEMA STAR</h1>
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={currentUser} 
        />
      </header>

      <div className="container">
        
        {/* --- 2. HIỂN THỊ TRANG ADMIN --- */}
        {activeTab === 'admin' && <AdminDashboard />}

        {activeTab === 'phim' && (
            <BookingFlow 
                currentUser={currentUser} 
                onSwitchTab={setActiveTab} 
            />
        )}

        {activeTab === 'rap' && <Theaters />}

        {/* --- 3. TRUYỀN onSwitchTab XUỐNG MEMBERS --- */}
        {activeTab === 'member' && (
            <Members 
              onUserChange={handleUserChange} 
              onSwitchTab={setActiveTab} 
            />
        )}

        {activeTab === 'luat' && <Rules />}
        
      </div>
    </div>
  );
}

export default App;
