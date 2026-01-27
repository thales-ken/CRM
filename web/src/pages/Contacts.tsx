import React, { useState, useEffect } from 'react';
import Badge from '../components/ui/Badge';
import DataTable from '../components/ui/DataTable';
import PageHeader from '../components/ui/PageHeader';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useMobile } from '../contexts/MobileContext';
import { contactsAPI, Contact } from '../api/client';
import ContactDetailModal from '../components/contacts/ContactDetailModal';
import ContactsStats from '../components/contacts/ContactsStats';
import { getStatusBadgeType } from '../utils/badgeHelpers';

const Contacts: React.FC = () => {
  const isMobile = useMobile();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await contactsAPI.getAll();
        setContacts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <PageHeader
        title="Contacts"
        subtitle="Manage your contacts and relationships"
        actionButton={{
          label: '+ Add Contact',
          onClick: () => {}
        }}
      />

      {/* Stats */}
      <ContactsStats
        isMobile={isMobile}
        totalContacts={contacts.length}
        activeContacts={contacts.filter(c => c.status === 'active').length}
        prospectContacts={contacts.filter(c => c.status === 'prospect').length}
        inactiveContacts={contacts.filter(c => c.status === 'inactive').length}
      />

      {/* Contacts Table */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>All Contacts</h2>
        {loading ? (
          <LoadingState message="Loading contacts..." />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <DataTable
            isMobile={isMobile}
            headers={['Photo', 'Name', 'Email', 'Phone', 'Company', 'Status', 'Action']}
            rows={contacts.map((contact) => [
              <div key={`photo-${contact.id}`} style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--border)',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {contact.photo ? (
                  <img 
                    src={contact.photo} 
                    alt={contact.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <span style={{ fontSize: '1.25rem' }}>👤</span>
                )}
              </div>,
              contact.name,
              contact.email,
              contact.phone,
              contact.company,
              <Badge key={contact.id} label={contact.status} type={getStatusBadgeType(contact.status)} />,
              <button
                onClick={() => setSelectedContact(contact)}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                }}
              >
                View
              </button>,
            ])}
            onRowClick={(idx) => setSelectedContact(contacts[idx])}
          />
        )}
      </div>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        getStatusType={getStatusBadgeType}
      />
    </div>
  );
};

export default Contacts;
