import React, { useState } from 'react';
import './Navigation.css';
import { useCRM } from '../../context/CRMContext';

export const Navigation: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, currentUser } = useCRM();
  const [activePage, setActivePage] = useState(() => window.location.hash.slice(1) || 'dashboard');

  const menuItems = [
    { label: 'Dashboard', icon: '📊', id: 'dashboard' },
    { label: 'Contacts', icon: '👥', id: 'contacts' },
    { label: 'Leads', icon: '🎯', id: 'leads' },
    { label: 'Tasks', icon: '✓', id: 'tasks' },
    { label: 'Companies', icon: '🏢', id: 'companies' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    window.location.hash = pageId;
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'dashboard';
      setActivePage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {sidebarOpen && <h1 className="crm-title">CRM</h1>}
        <button 
          className="toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </div>

      {sidebarOpen && (
        <>
          <nav className="menu-nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`menu-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="user-section">
            <div className="user-card">
              <div className="user-avatar">
                {currentUser?.firstName.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">{currentUser?.firstName} {currentUser?.lastName}</div>
                <div className="user-role">{currentUser?.role.replace('-', ' ')}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
