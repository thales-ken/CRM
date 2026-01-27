import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import { mockDeals } from '../mocks/data';

const Deals: React.FC = () => {
  const [filterStage, setFilterStage] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<typeof mockDeals[0] | null>(null);

  const filteredDeals = filterStage
    ? mockDeals.filter(deal => deal.stage === filterStage)
    : mockDeals;

  const dealsByStage = {
    negotiation: mockDeals.filter(d => d.stage === 'negotiation'),
    proposal: mockDeals.filter(d => d.stage === 'proposal'),
    won: mockDeals.filter(d => d.stage === 'won'),
    lost: mockDeals.filter(d => d.stage === 'lost'),
  };

  const stageValue = (stage: keyof typeof dealsByStage) =>
    dealsByStage[stage].reduce((sum, deal) => sum + deal.value, 0);

  const getStageType = (stage: string) => {
    if (stage === 'won') return 'success';
    if (stage === 'lost') return 'error';
    if (stage === 'proposal') return 'warning';
    return 'info';
  };

  const dealRows = filteredDeals.map(deal => [
    deal.title,
    deal.company,
    `$${deal.value.toLocaleString()}`,
    `${deal.probability}%`,
    deal.stage,
    deal.closeDate,
  ]);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Deals Pipeline</h1>
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
          + New Deal
        </button>
      </div>

      {/* Deal Stats by Stage */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {(Object.entries(dealsByStage) as [keyof typeof dealsByStage, typeof mockDeals][]).map(([stage, deals]) => (
          <div
            key={stage}
            onClick={() => setFilterStage(stage === filterStage ? null : stage)}
            style={{
              background: filterStage === stage ? '#1976d2' : '#fff',
              color: filterStage === stage ? '#fff' : '#333',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid #e0e0e0',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {deals.length}
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
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#333' }}>
          {filterStage ? `${filterStage.charAt(0).toUpperCase()}${filterStage.slice(1)} Deals` : 'All Deals'}
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Deal</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Company</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Value</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Probability</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Stage</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Close Date</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget as HTMLTableRowElement).style.background = '#f9f9f9'}
                onMouseLeave={(e) => (e.currentTarget as HTMLTableRowElement).style.background = 'white'}
                >
                  <td style={{ padding: '1rem' }}>{deal.title}</td>
                  <td style={{ padding: '1rem' }}>{deal.company}</td>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>${deal.value.toLocaleString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden', height: '24px' }}>
                      <div style={{
                        background: '#1976d2',
                        height: '100%',
                        width: `${deal.probability}%`,
                        transition: 'width 0.2s',
                      }} />
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <Badge label={deal.stage} type={getStageType(deal.stage)} />
                  </td>
                  <td style={{ padding: '1rem' }}>{deal.closeDate}</td>
                  <td style={{ padding: '1rem' }}>
                    <button
                      onClick={() => setSelectedDeal(deal)}
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

      {/* Deal Detail Modal */}
      {selectedDeal && (
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
              <h2 style={{ margin: 0 }}>{selectedDeal.title}</h2>
              <button
                onClick={() => setSelectedDeal(null)}
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
              <strong>Company:</strong> {selectedDeal.company}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Value:</strong> ${selectedDeal.value.toLocaleString()}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Probability:</strong> {selectedDeal.probability}%
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Stage:</strong> <Badge label={selectedDeal.stage} type={getStageType(selectedDeal.stage)} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Close Date:</strong> {selectedDeal.closeDate}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>Owner:</strong> {selectedDeal.owner}
            </div>
            <button
              onClick={() => setSelectedDeal(null)}
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

export default Deals;
