import React, { useState, useEffect, useMemo } from 'react';
import DataTable from '../components/ui/DataTable';
import Badge from '../components/ui/Badge';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useMobile } from '../contexts/MobileContext';
import { dealsAPI, contactsAPI, activitiesAPI } from '../api/client';
import DashboardStats from '../components/dashboard/DashboardStats';
import QuickActions from '../components/dashboard/QuickActions';
import AddDealModal from '../components/dashboard/AddDealModal';
import AddContactModal from '../components/dashboard/AddContactModal';
import CallLogModal from '../components/dashboard/CallLogModal';
import ScheduleMeetingModal from '../components/dashboard/ScheduleMeetingModal';
import Toast from '../components/ui/Toast';
import { handleImageUpload } from '../utils/fileHelpers';
import { getStageBadgeType } from '../utils/badgeHelpers';

const Dashboard: React.FC = () => {
  const isMobile = useMobile();
  const [deals, setDeals] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showCallLogModal, setShowCallLogModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [newDeal, setNewDeal] = useState<{ title: string; company: string; value: number; stage: 'negotiation' | 'proposal' | 'won' | 'lost'; probability: number }>({ title: '', company: '', value: 0, stage: 'negotiation', probability: 50 });
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', company: '', photo: '' });
  const [newActivity, setNewActivity] = useState({ type: 'call', description: '', date: '' });
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', attendees: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsData, contactsData, activitiesData] = await Promise.all([
          dealsAPI.getAll(),
          contactsAPI.getAll(),
          activitiesAPI.getAll(),
        ]);
        setDeals(dealsData);
        setContacts(contactsData);
        setActivities(activitiesData);
        setError(null);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalRevenue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(deal => deal.stage === 'won').length;
  const activeContacts = contacts.filter(contact => contact.status === 'active').length;
  const avgDealValue = deals.length > 0 ? Math.round(totalRevenue / deals.length) : 0;

  const recentActivityRows = useMemo(() => 
    activities.slice(0, 5).map(activity => [
      `${activity.type.charAt(0).toUpperCase()}${activity.type.slice(1)}`,
      activity.description,
      activity.date,
    ]),
    [activities]
  );

  const topDealsRows = useMemo(() => 
    deals
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map(deal => [
        deal.title,
        deal.company,
        `$${deal.value.toLocaleString()}`,
        `${deal.probability}%`,
        <Badge key={deal.id} label={deal.stage} type={getStageBadgeType(deal.stage)} />,
      ]),
    [deals]
  );

  const handleAddDeal = async () => {
    try {
      if (!newDeal.title || !newDeal.company || newDeal.value <= 0) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      await dealsAPI.create({
        ...newDeal,
        closeDate: new Date().toISOString().split('T')[0],
        owner: 'Current User'
      });
      setShowAddDealModal(false);
      setNewDeal({ title: '', company: '', value: 0, stage: 'negotiation', probability: 50 });
      const updatedDeals = await dealsAPI.getAll();
      setDeals(updatedDeals);
      showToast('Deal added successfully! 🎉');
    } catch (err) {
      console.error('Failed to add deal:', err);
      showToast('Failed to add deal', 'error');
    }
  };

  const handleAddContact = async () => {
    try {
      if (!newContact.name || !newContact.email || !newContact.phone) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      await contactsAPI.create(newContact);
      setShowAddContactModal(false);
      setNewContact({ name: '', email: '', phone: '', company: '', photo: '' });
      const updatedContacts = await contactsAPI.getAll();
      setContacts(updatedContacts);
      showToast('Contact added successfully! 👤');
    } catch (err) {
      console.error('Failed to add contact:', err);
      showToast('Failed to add contact', 'error');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleImageUpload(
      file,
      (base64) => setNewContact({ ...newContact, photo: base64 }),
      (error) => showToast(error, 'error')
    );
  };

  const handleAddCallLog = async () => {
    try {
      if (!newActivity.description.trim()) {
        showToast('Please enter call notes', 'error');
        return;
      }
      await activitiesAPI.create({ 
        type: 'call', 
        description: newActivity.description,
        date: new Date().toISOString().split('T')[0]
      });
      setShowCallLogModal(false);
      setNewActivity({ type: 'call', description: '', date: '' });
      const updatedActivities = await activitiesAPI.getAll();
      setActivities(updatedActivities);
      showToast('Call logged successfully! 📞');
    } catch (err) {
      console.error('Failed to log call:', err);
      showToast('Failed to log call', 'error');
    }
  };

  const handleAddMeeting = async () => {
    try {
      if (!newMeeting.title || !newMeeting.date || !newMeeting.attendees) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      await activitiesAPI.create({ 
        type: 'meeting', 
        description: `${newMeeting.title} with ${newMeeting.attendees}`,
        date: newMeeting.date 
      });
      setShowMeetingModal(false);
      setNewMeeting({ title: '', date: '', attendees: '' });
      const updatedActivities = await activitiesAPI.getAll();
      setActivities(updatedActivities);
      showToast('Meeting scheduled successfully! 📅');
    } catch (err) {
      console.error('Failed to schedule meeting:', err);
      showToast('Failed to schedule meeting', 'error');
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', fontWeight: '700' }}>Dashboard</h1>
        <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Welcome back! Here's your sales overview.</p>
      </div>

      {error && <ErrorState error={error} />}

      {loading ? (
        <LoadingState message="Loading dashboard data..." />
      ) : (
        <>
          {/* Stats Section */}
          <DashboardStats
            isMobile={isMobile}
            totalRevenue={totalRevenue}
            wonDeals={wonDeals}
            totalDeals={deals.length}
            activeContacts={activeContacts}
            totalContacts={contacts.length}
            avgDealValue={avgDealValue}
          />

          {/* Quick Actions */}
          <QuickActions
            isMobile={isMobile}
            onAddDeal={() => setShowAddDealModal(true)}
            onAddContact={() => setShowAddContactModal(true)}
            onCallLog={() => setShowCallLogModal(true)}
            onScheduleMeeting={() => setShowMeetingModal(true)}
          />

          {/* Recent Activity */}
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>Recent Activity</h2>
            <DataTable
              isMobile={isMobile}
              headers={['Type', 'Description', 'Date']}
              rows={recentActivityRows}
            />
          </div>

          {/* Top Deals */}
          <div style={{
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>Top Deals</h2>
            <DataTable
              isMobile={isMobile}
              headers={['Deal', 'Company', 'Value', 'Probability', 'Stage']}
              rows={topDealsRows}
            />
          </div>
        </>
      )}

      {/* Modals */}
      <AddDealModal
        isOpen={showAddDealModal}
        deal={newDeal}
        onChange={setNewDeal}
        onClose={() => setShowAddDealModal(false)}
        onSubmit={handleAddDeal}
      />

      <AddContactModal
        isOpen={showAddContactModal}
        contact={newContact}
        onChange={setNewContact}
        onPhotoUpload={handlePhotoUpload}
        onClose={() => setShowAddContactModal(false)}
        onSubmit={handleAddContact}
      />

      <CallLogModal
        isOpen={showCallLogModal}
        description={newActivity.description}
        onChange={(description) => setNewActivity({ ...newActivity, description })}
        onClose={() => setShowCallLogModal(false)}
        onSubmit={handleAddCallLog}
      />

      <ScheduleMeetingModal
        isOpen={showMeetingModal}
        meeting={newMeeting}
        onChange={setNewMeeting}
        onClose={() => setShowMeetingModal(false)}
        onSubmit={handleAddMeeting}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default Dashboard;
