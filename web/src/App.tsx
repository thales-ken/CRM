import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MobileProvider } from './contexts/MobileContext';
import NavBar from './components/ui/NavBar';
import MobileNav from './components/mobile/MobileNav';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Reports from './pages/Reports';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MobileProvider isMobile={isMobile}>
      <Router>
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {!isMobile && <NavBar />}
          <div style={{
            padding: isMobile ? '1rem' : '2rem',
            background: 'var(--bg-primary)',
            flex: 1,
            minHeight: isMobile ? 'calc(100vh - 80px)' : 'calc(100vh - 60px)',
            paddingBottom: isMobile ? 'calc(1rem + 70px)' : '1rem',
            overflowY: 'auto',
          }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
          {isMobile && <MobileNav />}
        </div>
      </Router>
    </MobileProvider>
  );
};;

export default App;
