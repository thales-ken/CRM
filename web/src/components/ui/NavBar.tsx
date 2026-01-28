import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav style={{
      padding: '0.875rem 2rem',
      background: '#fff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
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
        {/* Logo/Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginRight: '3rem',
          flexShrink: 0,
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
          }}>
            🚀
          </div>
          <span style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#1a1a1a',
          }}>
            CRM Sales
          </span>
        </div>

        {/* Navigation Links */}
        <ul style={{ 
          display: 'flex', 
          gap: '0.25rem', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          flex: 1,
        }}>
          <li>
            <Link to="/" style={{
              color: isActive('/') ? '#2563eb' : '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              display: 'block',
              transition: 'all 0.2s',
              background: isActive('/') ? '#eff6ff' : 'transparent',
            }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/contacts" style={{
              color: isActive('/contacts') ? '#2563eb' : '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              display: 'block',
              transition: 'all 0.2s',
              background: isActive('/contacts') ? '#eff6ff' : 'transparent',
            }}>
              Contacts
            </Link>
          </li>
          <li>
            <Link to="/deals" style={{
              color: isActive('/deals') ? '#2563eb' : '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              display: 'block',
              transition: 'all 0.2s',
              background: isActive('/deals') ? '#eff6ff' : 'transparent',
            }}>
              Deals
            </Link>
          </li>
          <li>
            <Link to="/reports" style={{
              color: isActive('/reports') ? '#2563eb' : '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              display: 'block',
              transition: 'all 0.2s',
              background: isActive('/reports') ? '#eff6ff' : 'transparent',
            }}>
              Leads
            </Link>
          </li>
          <li>
            <Link to="/tasks" style={{
              color: isActive('/tasks') ? '#2563eb' : '#6b7280',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              display: 'block',
              transition: 'all 0.2s',
              background: isActive('/tasks') ? '#eff6ff' : 'transparent',
            }}>
              Tasks
            </Link>
          </li>
        </ul>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#6b7280',
            fontSize: '1.25rem',
          }}>
            ⚙️
          </button>
          <button style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#6b7280',
            fontSize: '1.25rem',
          }}>
            🔔
          </button>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.125rem',
          }}>
            👤
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;