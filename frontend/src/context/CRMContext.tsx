import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Contact, Lead, User } from '../types';
import { userService } from '../services/api';

interface CRMContextType {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Selected items
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;

  // Modals
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  isLeadModalOpen: boolean;
  setIsLeadModalOpen: (open: boolean) => void;
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: (open: boolean) => void;
  isCompanyModalOpen: boolean;
  setIsCompanyModalOpen: (open: boolean) => void;

  // Notifications
  showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  // Load current user on mount
  React.useEffect(() => {
    const loadUser = async () => {
      const user = await userService.getCurrentUser();
      setCurrentUser(user);
    };
    loadUser();
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    // TODO: Implement notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
  }, []);

  const value: CRMContextType = {
    currentUser,
    setCurrentUser,
    sidebarOpen,
    setSidebarOpen,
    selectedContact,
    setSelectedContact,
    selectedLead,
    setSelectedLead,
    isContactModalOpen,
    setIsContactModalOpen,
    isLeadModalOpen,
    setIsLeadModalOpen,
    isTaskModalOpen,
    setIsTaskModalOpen,
    isCompanyModalOpen,
    setIsCompanyModalOpen,
    showNotification,
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within CRMProvider');
  }
  return context;
};
