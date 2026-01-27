import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/contacts', label: 'Contacts', icon: '👥' },
    { path: '/deals', label: 'Deals', icon: '🎯' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--primary)',
      color: '#fff',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      zIndex: 100,
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.5rem 0',
      }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              textDecoration: 'none',
              color: isActive(item.path) ? '#fff' : 'rgba(255,255,255,0.7)',
              borderTop: isActive(item.path) ? '3px solid #fff' : '3px solid transparent',
              transition: 'all 0.2s',
              fontSize: '0.75rem',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.icon}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '500' }}>{item.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;