import { useState } from 'react';
import { contactsAPI, Contact } from '../api/client';
import { uploadImage } from '../utils/fileHelpers';

export const useContactsHandlers = () => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddContact = async (
    newContact: { name: string; email: string; phone: string; company: string; photo: string },
    isEditingContact: boolean,
    selectedContact: Contact | null,
    onSuccess: () => Promise<void>
  ) => {
    try {
      if (!newContact.name || !newContact.email || !newContact.phone) {
        showToast('Please fill in all required fields', 'error');
        return false;
      }

      if (isEditingContact && selectedContact) {
        await contactsAPI.update(selectedContact.id, newContact);
        showToast('Contact updated successfully! ✏️');
      } else {
        await contactsAPI.create(newContact);
        showToast('Contact added successfully! 👤');
      }

      await onSuccess();
      return true;
    } catch (err) {
      console.error('Failed to save contact:', err);
      showToast('Failed to save contact', 'error');
      return false;
    }
  };

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onPhotoChange: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadImage(
      file,
      onPhotoChange,
      (error) => showToast(error, 'error')
    );
  };

  const handleExportContacts = (
    selectedContacts: Set<number>,
    paginatedContacts: Contact[],
    filteredContacts: Contact[]
  ) => {
    const contactsToExport = selectedContacts.size > 0 
      ? paginatedContacts.filter(c => selectedContacts.has(c.id))
      : filteredContacts;

    if (contactsToExport.length === 0) {
      showToast('No contacts to export', 'error');
      return;
    }

    const csv = [
      ['Name', 'Email', 'Phone', 'Company', 'Status'].join(','),
      ...contactsToExport.map(c => 
        [c.name, c.email, c.phone, c.company, c.status].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast(`Exported ${contactsToExport.length} contacts! 📥`);
  };

  const handleDeleteContacts = async (
    selectedContacts: Set<number>,
    onSuccess: () => Promise<void>
  ) => {
    if (selectedContacts.size === 0) {
      showToast('Please select contacts to delete', 'error');
      return;
    }

    if (!window.confirm(`Delete ${selectedContacts.size} contact(s)? This cannot be undone.`)) {
      return;
    }

    try {
      const contactsToDelete = Array.from(selectedContacts);
      await Promise.all(
        contactsToDelete.map(id => contactsAPI.delete(id))
      );
      
      await onSuccess();
      showToast(`Deleted ${contactsToDelete.length} contact(s)! 🗑️`);
    } catch (err) {
      console.error('Failed to delete contacts:', err);
      showToast('Failed to delete contacts', 'error');
    }
  };

  const handleAssignOwner = (selectedContacts: Set<number>) => {
    if (selectedContacts.size === 0) {
      showToast('Please select contacts to assign', 'error');
      return;
    }

    const ownerName = prompt('Enter owner name:');
    if (!ownerName) return;

    showToast(`Assigned ${selectedContacts.size} contact(s) to ${ownerName}! 👤`, 'success');
  };

  return {
    toast,
    showToast,
    handleAddContact,
    handlePhotoUpload,
    handleExportContacts,
    handleDeleteContacts,
    handleAssignOwner,
  };
};
