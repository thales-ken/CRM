import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Reports from './pages/Reports';

const App: React.FC = () => (
  <Router>
    <div style={{ background: '#f5f5f5', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ padding: '2rem', background: '#f5f5f5', minHeight: 'calc(100vh - 60px)' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
