import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie, Legend 
} from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('company');

  // --- DATA MOCKUP ---
  const companyData = [
    { name: 'Mon', fuel: 4000, efficiency: 2400 },
    { name: 'Tue', fuel: 3000, efficiency: 1398 },
    { name: 'Wed', fuel: 2000, efficiency: 9800 },
    { name: 'Thu', fuel: 2780, efficiency: 3908 },
    { name: 'Fri', fuel: 1890, efficiency: 4800 },
  ];

  const portCongestion = [
    { name: 'Singapore', wait: 12 },
    { name: 'Rotterdam', wait: 5 },
    { name: 'LA', wait: 24 },
    { name: 'Shanghai', wait: 18 },
    { name: 'Dubai', wait: 8 },
  ];

  const insurerRisk = [
    { name: 'High Risk', value: 15, color: '#ef4444' },
    { name: 'Moderate', value: 30, color: '#f59e0b' },
    { name: 'Low Risk', value: 55, color: '#10b981' },
  ];

  const styles = {
    wrapper: { padding: '20px', background: '#f1f5f9', minHeight: '100vh' },
    tabBar: { display: 'flex', gap: '10px', marginBottom: '20px', background: '#fff', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    tab: (active) => ({
      flex: 1, padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer',
      fontWeight: 'bold', transition: '0.3s',
      background: active ? '#2563eb' : 'transparent',
      color: active ? '#fff' : '#64748b'
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' },
    card: { background: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }
  };

  return (
    <div style={styles.wrapper}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>Stakeholder Dashboards</h1>
        <p style={{ color: '#64748b' }}>Milestone 4: Strategic Analytics & Compliance</p>
      </header>

      {/* Navigation Tabs */}
      <div style={styles.tabBar}>
        <button style={styles.tab(activeTab === 'company')} onClick={() => setActiveTab('company')}>🏢 Company Analytics</button>
        <button style={styles.tab(activeTab === 'port')} onClick={() => setActiveTab('port')}>⚓ Port Authority</button>
        <button style={styles.tab(activeTab === 'insurer')} onClick={() => setActiveTab('insurer')}>🛡️ Insurer Risk</button>
      </div>

      <div style={styles.grid}>
        {/* --- COMPANY VIEW --- */}
        {activeTab === 'company' && (
          <>
            <div style={styles.card}>
              <h3>Fleet Fuel Consumption</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={companyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="fuel" stroke="#2563eb" fill="#bfdbfe" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={styles.card}>
              <h3>Fleet ROI Metrics</h3>
              <div style={{ textAlign: 'center', paddingTop: '50px' }}>
                <h1 style={{ fontSize: '50px', color: '#10b981', margin: 0 }}>$4.2M</h1>
                <p style={{ color: '#64748b' }}>Operating Profit (Q1 2026)</p>
                <button style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: '#0f172a', color: '#fff', border: 'none', cursor: 'pointer' }}>Generate PDF Report</button>
              </div>
            </div>
          </>
        )}

        {/* --- PORT VIEW --- */}
        {activeTab === 'port' && (
          <>
            <div style={styles.card}>
              <h3>Avg Vessel Wait Time (Hours)</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={portCongestion}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="wait" fill="#3b82f6" radius={[5, 5, 0, 0]}>
                      {portCongestion.map((entry, index) => (
                        <Cell key={index} fill={entry.wait > 20 ? '#ef4444' : '#3b82f6'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={styles.card}>
              <h3>Yard Density Audit</h3>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Sector Alpha</span> <b>82%</b>
                </div>
                <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: '#ef4444' }}></div>
                </div>
                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '5px' }}>⚠️ Capacity Warning: Immediate berth allocation required.</p>
              </div>
            </div>
          </>
        )}

        {/* --- INSURER VIEW --- */}
        {activeTab === 'insurer' && (
          <>
            <div style={styles.card}>
              <h3>Portfolio Risk Rating</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={insurerRisk} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {insurerRisk.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={styles.card}>
              <h3>Compliance Violation Log</h3>
              <div style={{ fontSize: '13px' }}>
                <div style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <b>Ever Ace:</b> Speeding in ECA Zone <span style={{ color: '#ef4444', float: 'right' }}>PENDING FINE</span>
                </div>
                <div style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <b>Maersk S:</b> AIS Gap Detected (14m) <span style={{ color: '#f59e0b', float: 'right' }}>UNDER REVIEW</span>
                </div>
                <button onClick={() => alert('Exporting Audit Data...')} style={{ width: '100%', marginTop: '20px', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                  📥 Download Compliance CSV
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
