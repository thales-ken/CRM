import React, { useState, useEffect } from 'react';
import { useMobile } from '../contexts/MobileContext';
import { contactsAPI, Contact } from '../api/client';
import ContactDetailModal from '../components/contacts/ContactDetailModal';
import AddContactModal from '../components/dashboard/AddContactModal';
import Toast from '../components/ui/Toast';
import { getStatusBadgeType } from '../utils/badgeHelpers';
import { useContactsHandlers } from '../hooks/useContactsHandlers';
import ContactsFilterButtons from '../components/contacts/ContactsFilterButtons';
import ContactsBulkActions from '../components/contacts/ContactsBulkActions';
import ContactsTableDesktop from '../components/contacts/ContactsTableDesktop';
import ContactsListMobile from '../components/contacts/ContactsListMobile';

type FilterType = 'all' | 'active' | 'lead' | 'inactive';

const Contacts: React.FC = () => {
  const isMobile = useMobile();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '', photo: '' });
  const itemsPerPage = 10;

  const {
    toast,
    handleAddContact: handleAddContactAPI,
    handlePhotoUpload,
    handleExportContacts,
    handleDeleteContacts,
    handleAssignOwner,
  } = useContactsHandlers();

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

  // Filter contacts based on search and active filter
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'lead') return matchesSearch && contact.status === 'prospect';
    return matchesSearch && contact.status === activeFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

  // Get initials for contacts without photos
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Toggle contact selection
  const toggleContactSelection = (id: number) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedContacts(newSelected);
  };

  // Toggle all contacts selection
  const toggleAllContacts = () => {
    if (selectedContacts.size === paginatedContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(paginatedContacts.map(c => c.id)));
    }
  };

  // Handle add contact with custom hook
  const handleAddContact = async () => {
    await handleAddContactAPI(newContact, isEditingContact, selectedContact, async () => {
      setShowAddContactModal(false);
      setIsEditingContact(false);
      setNewContact({ name: '', email: '', phone: '', company: '', photo: '' });
      const updatedContacts = await contactsAPI.getAll();
      setContacts(updatedContacts);
    });
  };

  // Wrapper functions to refresh contacts list after operations
  const handleExportContactsWrapper = () => {
    handleExportContacts(selectedContacts, paginatedContacts, filteredContacts);
  };

  const handleDeleteContactsWrapper = async () => {
    await handleDeleteContacts(selectedContacts, async () => {
      setSelectedContacts(new Set());
      const updatedContacts = await contactsAPI.getAll();
      setContacts(updatedContacts);
    });
  };

  const handleAssignOwnerWrapper = () => {
    handleAssignOwner(selectedContacts);
    setSelectedContacts(new Set());
  };

  const handlePhotoUploadWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePhotoUpload(e, (fileUrl) => setNewContact({ ...newContact, photo: fileUrl }));
  };

  // Handle edit contact
  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setNewContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      photo: contact.photo || '',
    });
    setIsEditingContact(true);
    setShowAddContactModal(true);
  };

  // Desktop version
  if (!isMobile) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'var(--bg-primary)',
        paddingBottom: '2rem',
      }}>
        {/* Main Content */}
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '2rem',
        }}>
          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '0.5rem',
            }}>
              <div>
                <h1 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1.875rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                }}>
                  Contact Management
                </h1>
                <p style={{ 
                  margin: 0, 
                  color: '#6b7280',
                  fontSize: '0.95rem',
                }}>
                  Monitor and manage {contacts.length.toLocaleString()} active sales contacts.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddContactModal(true);
                  setIsEditingContact(false);
                  setNewContact({ name: '', email: '', phone: '', company: '', photo: '' });
                }}
                style={{
                  padding: '0.625rem 1.25rem',
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <span style={{ fontSize: '1rem' }}>👤+</span>
                Add Contact
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div style={{ 
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
              {/* Search */}
              <div style={{ 
                flex: '1 1 300px',
                position: 'relative',
              }}>
                <span style={{ 
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem',
                }}>
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search contacts by name, email, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Filter Buttons */}
              <ContactsFilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                isMobile={false}
              />
            </div>
          </div>

          {/* Bulk Actions */}
          <ContactsBulkActions
            selectedCount={selectedContacts.size}
            totalCount={filteredContacts.length}
            startIndex={startIndex}
            itemsPerPage={itemsPerPage}
            onExport={handleExportContactsWrapper}
            onDelete={handleDeleteContactsWrapper}
            onAssignOwner={handleAssignOwnerWrapper}
            isMobile={false}
          />

          {/* Table */}
          <ContactsTableDesktop
            contacts={paginatedContacts}
            loading={loading}
            error={error}
            selectedContacts={selectedContacts}
            onToggleSelection={toggleContactSelection}
            onToggleAll={toggleAllContacts}
            onEditContact={handleEditContact}
            getInitials={getInitials}
          />

          {/* Pagination */}
          {!loading && !error && filteredContacts.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredContacts.length)} of {filteredContacts.length} results
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    background: currentPage === 1 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                  }}
                >
                  ‹
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        background: currentPage === page ? '#2563eb' : 'var(--bg-secondary)',
                        color: currentPage === page ? '#fff' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: currentPage === page ? '600' : '400',
                        minWidth: '36px',
                      }}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span style={{ padding: '0.5rem', color: '#6b7280' }}>...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        background: currentPage === totalPages ? '#2563eb' : 'var(--bg-secondary)',
                        color: currentPage === totalPages ? '#fff' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        minWidth: '36px',
                      }}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    background: currentPage === totalPages ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    color: '#6b7280',
                  }}
                >
                  ›
                </button>
              </div>
            </div>
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
  }

  // Mobile version (light theme)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: isMobile ? '80px' : '2rem',
    }}>
      {/* Header */}
      <div style={{
        padding: isMobile ? '1rem' : '1.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)',
      }}>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontWeight: '600',
          margin: 0,
        }}>
          Contacts
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={() => {
              setShowAddContactModal(true);
              setIsEditingContact(false);
              setNewContact({ name: '', email: '', phone: '', company: '', photo: '' });
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#2563eb',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.25rem',
              color: '#fff',
            }}
          >
            +
          </button>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.25rem',
          }}>
            👤
          </button>
        </div>
      </div>

      <div style={{ padding: isMobile ? '1rem' : '1.5rem 2rem' }}>
        {/* Search Bar */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderRadius: '16px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          border: '1px solid var(--border)',
        }}>
          <span style={{ fontSize: '1.25rem', opacity: 0.5 }}>🔍</span>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#6b7280',
              fontSize: '1rem',
              fontWeight: '400',
            }}
          />
        </div>

        {/* Filter Buttons */}
        <ContactsFilterButtons
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          isMobile={true}
        />

        {/* Bulk Actions - Mobile */}
        <ContactsBulkActions
          selectedCount={selectedContacts.size}
          totalCount={filteredContacts.length}
          startIndex={0}
          itemsPerPage={filteredContacts.length}
          onExport={handleExportContactsWrapper}
          onDelete={handleDeleteContactsWrapper}
          onAssignOwner={handleAssignOwnerWrapper}
          isMobile={true}
        />

        {/* Section Header */}
        <h2 style={{
          color: '#9ca3af',
          fontSize: '0.75rem',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}>
          RECENT CONTACTS
        </h2>

        {/* Contacts List */}
        <ContactsListMobile
          contacts={filteredContacts}
          loading={loading}
          error={error}
          selectedContacts={selectedContacts}
          onToggleSelection={toggleContactSelection}
          onEditContact={handleEditContact}
          getInitials={getInitials}
        />


      </div>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={() => setSelectedContact(null)}
        getStatusType={getStatusBadgeType}
      />

      {/* Add Contact Modal */}
      <AddContactModal
        isOpen={showAddContactModal}
        onClose={() => setShowAddContactModal(false)}
        onSubmit={handleAddContact}
        contact={newContact}
        onChange={setNewContact}
        onPhotoUpload={handlePhotoUploadWrapper}
        isEditing={isEditingContact}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  );
};

export default Contacts;
