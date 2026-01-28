import React from 'react';

const Reports: React.FC = () => {
  const funnelData = [
    { week: 'WK 1', value: 30 },
    { week: 'WK 2', value: 45 },
    { week: 'WK 3', value: 35 },
    { week: 'WK 4', value: 50 },
    { week: 'WK 5', value: 62 },
  ];

  const revenueData = [
    { quarter: 'Q1', actual: 75, goal: 80 },
    { quarter: 'Q2', actual: 65, goal: 75 },
    { quarter: 'Q3', actual: 85, goal: 90 },
    { quarter: 'Q4', actual: 70, goal: 85 },
  ];

  const maxFunnelValue = Math.max(...funnelData.map(d => d.value));
  const maxRevenueValue = Math.max(...revenueData.flatMap(d => [d.actual, d.goal]));

  return (
    <div style={{ 
      background: '#f8f9fa',
      minHeight: '100vh',
      padding: 'clamp(1rem, 4vw, 2rem)',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: 'clamp(1.5rem, 4vw, 1.875rem)',
            fontWeight: '700',
            color: '#1a1a1a',
          }}>
            Dashboard Overview
          </h1>
          <div style={{ position: 'relative', width: 'clamp(200px, 90%, 300px)' }}>
            <span style={{ 
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
            }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search leads, deals..."
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem 0.625rem 2.5rem',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {/* Total Revenue */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                Total Revenue
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#10b981',
                fontWeight: '600',
              }}>
                +12.4%
              </span>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' }}>
              $1,240,000
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              vs. $1M last quarter
            </div>
          </div>

          {/* New Leads */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                New Leads
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#10b981',
                fontWeight: '600',
              }}>
                +5.2%
              </span>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' }}>
              854
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Active campaigns: 4
            </div>
          </div>

          {/* Win Rate */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
                Win Rate
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#ef4444',
                fontWeight: '600',
              }}>
                -2.1%
              </span>
            </div>
            <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' }}>
              64.5%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Target: 70%
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Sales Funnel Trends */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1a1a1a' }}>
                Sales Funnel Trends
              </h2>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Last 30 days</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: '700', color: '#1a1a1a' }}>4.2k</span>
              <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.5rem' }}>total leads</span>
            </div>
            <div style={{ height: '200px', position: 'relative' }}>
              <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {/* Area under curve */}
                <path
                  d={`M 0 ${200 - (funnelData[0].value / maxFunnelValue) * 150} 
                      C 60 ${200 - (funnelData[1].value / maxFunnelValue) * 150},
                        80 ${200 - (funnelData[1].value / maxFunnelValue) * 150},
                        120 ${200 - (funnelData[2].value / maxFunnelValue) * 150}
                      C 160 ${200 - (funnelData[2].value / maxFunnelValue) * 150},
                        180 ${200 - (funnelData[3].value / maxFunnelValue) * 150},
                        220 ${200 - (funnelData[3].value / maxFunnelValue) * 150}
                      C 260 ${200 - (funnelData[3].value / maxFunnelValue) * 150},
                        280 ${200 - (funnelData[4].value / maxFunnelValue) * 150},
                        320 ${200 - (funnelData[4].value / maxFunnelValue) * 150}
                      L 320 200 L 0 200 Z`}
                  fill="url(#funnelGradient)"
                />
                {/* Line */}
                <path
                  d={`M 0 ${200 - (funnelData[0].value / maxFunnelValue) * 150} 
                      C 60 ${200 - (funnelData[1].value / maxFunnelValue) * 150},
                        80 ${200 - (funnelData[1].value / maxFunnelValue) * 150},
                        120 ${200 - (funnelData[2].value / maxFunnelValue) * 150}
                      C 160 ${200 - (funnelData[2].value / maxFunnelValue) * 150},
                        180 ${200 - (funnelData[3].value / maxFunnelValue) * 150},
                        220 ${200 - (funnelData[3].value / maxFunnelValue) * 150}
                      C 260 ${200 - (funnelData[3].value / maxFunnelValue) * 150},
                        280 ${200 - (funnelData[4].value / maxFunnelValue) * 150},
                        320 ${200 - (funnelData[4].value / maxFunnelValue) * 150}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              </svg>
              {/* Week labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                {funnelData.map((item) => (
                  <span key={item.week} style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    {item.week}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks for Today */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1a1a1a' }}>
                Tasks for Today
              </h2>
              <a href="#" style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>View All</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1a1a1a' }}>Follow up: Sarah Jenkins</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Due 2:00 PM</div>
                </div>
                <span style={{ fontSize: '1rem' }}>🚩</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1a1a1a' }}>Prepare Q3 Forecast</div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Due 5:00 PM</div>
                </div>
                <span style={{ fontSize: '1rem' }}>❗</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1a1a1a' }}>Contract: BioTech Corp</div>
                  <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>Overdue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Revenue vs Goal */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#1a1a1a' }}>
                Revenue vs Goal
              </h2>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#3b82f6' }}></div>
                  <span style={{ color: '#6b7280' }}>Actual</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#e5e7eb' }}></div>
                  <span style={{ color: '#6b7280' }}>Goal</span>
                </div>
              </div>
            </div>
            <div style={{ height: '250px', display: 'flex', alignItems: 'flex-end', gap: '2rem', paddingTop: '1rem' }}>
              {revenueData.map((item) => (
                <div key={item.quarter} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', display: 'flex', gap: '0.5rem', alignItems: 'flex-end', marginBottom: '0.5rem', height: '200px' }}>
                    <div style={{ 
                      flex: 1, 
                      background: '#3b82f6', 
                      borderRadius: '4px 4px 0 0',
                      height: `${(item.actual / maxRevenueValue) * 100}%`,
                      minHeight: '20px',
                    }}></div>
                    <div style={{ 
                      flex: 1, 
                      background: '#e5e7eb', 
                      borderRadius: '4px 4px 0 0',
                      height: `${(item.goal / maxRevenueValue) * 100}%`,
                      minHeight: '20px',
                    }}></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>{item.quarter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e5e7eb',
          }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#1a1a1a' }}>
              Recent Activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#3b82f6',
                  marginTop: '0.375rem',
                  flexShrink: 0,
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    <strong>Deal Closed</strong> with Acme Corp
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>12 mins ago • $45,000</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#fbbf24',
                  marginTop: '0.375rem',
                  flexShrink: 0,
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    <strong>Email Sent</strong> to John Doe
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>1 hour ago • Marketing Campaign</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#10b981',
                  marginTop: '0.375rem',
                  flexShrink: 0,
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    <strong>New Lead</strong> created from Website
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>3 hours ago • Organic Search</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#6b7280',
                  marginTop: '0.375rem',
                  flexShrink: 0,
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    <strong>Meeting Scheduled</strong> with BioTech
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Yesterday at 4:30 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Lead Button */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button style={{
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.875rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '1.125rem' }}>+</span>
            Add New Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
