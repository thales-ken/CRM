import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import { mockContacts } from '../mocks/data';

const Contacts: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<typeof mockContacts[0] | null>(null);

  const contactRows = mockContacts.map(contact => [
    contact.name,
    contact.email,
    contact.phone,
    contact.company,
    contact.status,
  ]);

  const getStatusType = (status: string) => {
    if (status === 'active') return 'success';
    if (status === 'prospect') return 'warning';
    return 'error';
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Contacts</h1>
        <button style={{
          padding: '0.75rem 1.5rem',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
        }}>
          + Add Contact
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          background: '#e3f2fd',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1565c0' }}>{mockContacts.length}</div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Total Contacts</div>
        </div>
        <div style={{
          background: '#e8f5e9',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2e7d32' }}>
            {mockContacts.filter(c => c.status === 'active').length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Active</div>
        </div>
        <div style={{
          background: '#fff3e0',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e65100' }}>
            {mockContacts.filter(c => c.status === 'prospect').length}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>Prospects</div>
        </div>
      </div>

      {/* Contacts Table */}
      <div style={{
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>All Contacts</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Phone</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Company</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map((contact, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLTableRowElement).style.background = '#f9f9f9'}
                onMouseLeave={(e) => (e.currentTarget as HTMLTableRowElement).style.background = 'white'}
                >
                  <td style={{ padding: '1rem' }}>{contact.name}</td>
                  <td style={{ padding: '1rem', color: '#0066cc' }}>{contact.email}</td>
                  <td style={{ padding: '1rem' }}>{contact.phone}</td>
                  <td style={{ padding: '1rem' }}>{contact.company}</td>
                  <td style={{ padding: '1rem' }}>
                    <Badge label={contact.status} type={getStatusType(contact.status)} />
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => setSelectedContact(contact)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{selectedContact.name}</h2>
              <button
                onClick={() => setSelectedContact(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Email:</strong> {selectedContact.email}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Phone:</strong> {selectedContact.phone}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Company:</strong> {selectedContact.company}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Status:</strong> <Badge label={selectedContact.status} type={getStatusType(selectedContact.status)} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Created:</strong> {selectedContact.createdAt}
            </div>
            <button
              onClick={() => setSelectedContact(null)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
