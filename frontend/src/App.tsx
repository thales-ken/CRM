import { useState, useEffect } from 'react';
import './App.css';
import { CRMProvider } from './context/CRMContext';
import { Navigation } from './components/Navigation/Navigation';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard';
      setCurrentPage(hash);
    };

    // Set initial page from hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <div className="page"><h1>Contacts</h1><p>Coming soon...</p></div>;
      case 'leads':
        return <div className="page"><h1>Leads</h1><p>Coming soon...</p></div>;
      case 'tasks':
        return <div className="page"><h1>Tasks</h1><p>Coming soon...</p></div>;
      case 'companies':
        return <div className="page"><h1>Companies</h1><p>Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <CRMProvider>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </CRMProvider>
  );
}

export default App;
