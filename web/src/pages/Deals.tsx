import React, { useState, useEffect } from 'react';
import Badge from '../components/ui/Badge';
import DataTable from '../components/ui/DataTable';
import PageHeader from '../components/ui/PageHeader';
import DetailModal from '../components/ui/DetailModal';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useMobile } from '../contexts/MobileContext';
import { dealsAPI, Deal } from '../api/client';
import { getStageBadgeType } from '../utils/badgeHelpers';

const Deals: React.FC = () => {
  const isMobile = useMobile();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStage, setFilterStage] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await dealsAPI.getAll();
        setDeals(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const filteredDeals = filterStage
    ? deals.filter(deal => deal.stage === filterStage)
    : deals;

  const dealsByStage = {
    negotiation: deals.filter(d => d.stage === 'negotiation'),
    proposal: deals.filter(d => d.stage === 'proposal'),
    won: deals.filter(d => d.stage === 'won'),
    lost: deals.filter(d => d.stage === 'lost'),
  };

  const stageValue = (stage: keyof typeof dealsByStage) =>
    dealsByStage[stage].reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <PageHeader
        title="Deals Pipeline"
        subtitle="Track your sales pipeline and deal progress"
        actionButton={{
          label: '+ New Deal',
          onClick: () => {}
        }}
      />

      {/* Deal Stats by Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        {(Object.entries(dealsByStage) as [keyof typeof dealsByStage, typeof deals][]).map(([stage, stageDeals]) => (
          <div
            key={stage}
            onClick={() => setFilterStage(stage === filterStage ? null : stage)}
            style={{
              background: filterStage === stage ? 'var(--primary)' : '#fff',
              color: filterStage === stage ? '#fff' : 'var(--text-primary)',
              padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            border: `1px solid ${filterStage === stage ? 'var(--primary)' : 'var(--border)'}`,
            transition: 'all 0.2s',
            boxShadow: filterStage === stage ? '0 4px 12px rgba(67, 84, 86, 0.2)' : '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {stageDeals.length}
            </div>
            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'capitalize' }}>
              {stage}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              ${(stageValue(stage) / 1000).toFixed(0)}K
            </div>
          </div>
        ))}
      </div>

      {/* Deals Table */}
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {filterStage ? `${filterStage.charAt(0).toUpperCase()}${filterStage.slice(1)} Deals` : 'All Deals'}
        </h2>
        {loading ? (
          <LoadingState message="Loading deals..." />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <DataTable
            isMobile={isMobile}
            headers={['Deal', 'Company', 'Value', 'Probability', 'Stage', 'Close Date', 'Action']}
            rows={filteredDeals.map((deal) => [
              deal.title,
              deal.company,
              `$${deal.value.toLocaleString()}`,
              <div key={`prob-${deal.id}`} style={{ background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden', height: '24px' }}>
                <div style={{
                  background: 'var(--primary)',
                  height: '100%',
                  width: `${deal.probability}%`,
                  transition: 'width 0.2s',
                }} />
              </div>,
              <Badge key={`stage-${deal.id}`} label={deal.stage} type={getStageBadgeType(deal.stage)} />,
              deal.closeDate,
              <button
                key={`btn-${deal.id}`}
                onClick={() => setSelectedDeal(deal)}
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
            onRowClick={(idx) => setSelectedDeal(filteredDeals[idx])}
          />
        )}
      </div>

      {/* Deal Detail Modal */}
      <DetailModal
        title={selectedDeal?.title || ''}
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
      >
        {selectedDeal && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Company:</strong> {selectedDeal.company}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Value:</strong> ${selectedDeal.value.toLocaleString()}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Probability:</strong> {selectedDeal.probability}%
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Stage:</strong> <Badge label={selectedDeal.stage} type={getStageBadgeType(selectedDeal.stage)} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Close Date:</strong> {selectedDeal.closeDate}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Owner:</strong> {selectedDeal.owner}
            </div>
          </>
        )}
      </DetailModal>
    </div>
  );
};

export default Deals;
