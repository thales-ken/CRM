import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SettingsOffcanvas from './SettingsOffcanvas';

const NavBar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);

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
      minHeight: '60px',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap',
      }}>
        {/* Logo/Brand */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginRight: '1rem',
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
          flexWrap: 'wrap',
          alignItems: 'center',
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
              Analytics
            </Link>
          </li>
        </ul>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
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
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.125rem',
              }}
              title={user?.name}
            >
              👤
            </div>
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                minWidth: '200px',
                zIndex: 200,
                marginTop: '0.5rem',
              }}>
                <div style={{
                  padding: '1rem',
                  borderBottom: '1px solid #f3f4f6',
                }}>
                  <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a' }}>
                    {user?.name}
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
                    {user?.email}
                  </p>
                  <div style={{
                    marginTop: '0.5rem',
                    display: 'inline-block',
                    background: '#e0e7ff',
                    color: '#3730a3',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                  }}>
                    {user?.role.replace('_', ' ')}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowSettings(true);
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #f3f4f6',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#374151',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: 0,
                  }}
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#ef4444',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    borderRadius: 0,
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Settings Offcanvas */}
      <SettingsOffcanvas isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </nav>
  );
};

export default NavBar;