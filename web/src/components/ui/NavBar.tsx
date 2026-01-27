import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      padding: '1rem 2rem',
      background: 'var(--primary)',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginRight: '2rem',
          flexShrink: 0,
        }}>
          📊 CRM
        </div>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
          <li>
            <Link to="/" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              borderBottom: isActive('/') ? '3px solid #fff' : '3px solid transparent',
              transition: 'border-color 0.2s',
              display: 'block',
            }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/contacts" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              borderBottom: isActive('/contacts') ? '3px solid #fff' : '3px solid transparent',
              transition: 'border-color 0.2s',
              display: 'block',
            }}>
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/deals" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              borderBottom: isActive('/deals') ? '3px solid #fff' : '3px solid transparent',
              transition: 'border-color 0.2s',
              display: 'block',
            }}>
              Deals
            </Link>
          </li>
          <li>
            <Link to="/reports" style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '0.5rem 1rem',
              borderBottom: isActive('/reports') ? '3px solid #fff' : '3px solid transparent',
              transition: 'border-color 0.2s',
              display: 'block',
            }}>
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;