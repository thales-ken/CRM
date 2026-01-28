import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
          <rect x="3" y="3" width="7" height="7" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
        </svg>
      )
    },
    { 
      path: '/contacts', 
      label: 'Contacts', 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
        </svg>
      )
    },
    { 
      path: '/deals', 
      label: 'Deals', 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
          <path d="M3 3v18h18" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18 17V9M13 17v-6M8 17v-3" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      path: '/reports', 
      label: 'Analytics', 
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: '4px' }}>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="9" y="3" width="6" height="4" rx="1" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2"/>
          <path d="M9 12h6M9 16h6" stroke={active ? '#2563eb' : '#d1d5db'} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )
    },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid #e5e7eb',
      boxShadow: '0 -1px 3px rgba(0, 0, 0, 0.05)',
      zIndex: 100,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.75rem 0 0.5rem 0',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                textDecoration: 'none',
                color: active ? '#2563eb' : '#9ca3af',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              {item.icon(active)}
              <div style={{ 
                fontSize: '0.7rem', 
                fontWeight: active ? '600' : '400',
                marginTop: '0.25rem',
              }}>
                {item.label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;