import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationModule = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  // Mock data for 13 notifications
  const initialNotifications = [
    { id: 1, type: 'Alert', msg: 'Vessel "Oceanic-1" is off-course by 5 degrees.', time: '2m ago', category: 'Fleet' },
    { id: 2, type: 'Update', msg: 'Port of Singapore congestion level: Low.', time: '15m ago', category: 'Ports' },
    { id: 3, type: 'Urgent', msg: 'Storm warning issued for South China Sea.', time: '1h ago', category: 'Weather' },
    { id: 4, type: 'System', msg: 'Maintenance scheduled for 02:00 UTC.', time: '2h ago', category: 'System' },
    { id: 5, type: 'Alert', msg: 'Fuel level below threshold for Vessel-402.', time: '3h ago', category: 'Fleet' },
    { id: 6, type: 'Update', msg: 'New berth assigned for Vessel-109.', time: '4h ago', category: 'Ports' },
    { id: 7, type: 'Alert', msg: 'Unauthorized drone detected near Port X.', time: '5h ago', category: 'Security' },
    { id: 8, type: 'Update', msg: 'Customs clearance approved for Cargo-88.', time: '6h ago', category: 'Ports' },
    { id: 9, type: 'System', msg: 'API connection restored with Weather Bureau.', time: '8h ago', category: 'System' },
    { id: 10, type: 'Alert', msg: 'Engine temperature rising on Vessel-B.', time: '10h ago', category: 'Fleet' },
    { id: 11, type: 'Weather', msg: 'High tide alert for tomorrow morning.', time: '12h ago', category: 'Weather' },
    { id: 12, type: 'Update', msg: 'Crew rotation list updated.', time: '14h ago', category: 'System' },
    { id: 13, type: 'Security', msg: 'Weekly security audit completed.', time: '1d ago', category: 'Security' },
  ];

  const categories = ['All', 'Fleet', 'Ports', 'Weather', 'System', 'Security'];

  const styles = {
    container: { padding: '25px', maxWidth: '900px', margin: '0 auto' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    goBack: { background: '#f1f5f9', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' },
    updateAll: { background: '#0ea5e9', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: 'white' },
    filterBar: { display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '10px' },
    filterBtn: (active) => ({
      padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer',
      background: active ? '#0ea5e9' : 'white', color: active ? 'white' : '#64748b', fontWeight: '500'
    }),
    notifCard: {
      background: 'white', padding: '18px', borderRadius: '12px', marginBottom: '12px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    },
    clearAll: { background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', float: 'right', marginTop: '20px' }
  };

  const filteredNotifs = filter === 'All' ? initialNotifications : initialNotifications.filter(n => n.category === filter);

  return (
    <div style={styles.container}>
      {/* TOP SECTION */}
      <div style={styles.topBar}>
        <button style={styles.goBack} onClick={() => navigate(-1)}>← Go Back</button>
        <h2 style={{ margin: 0 }}>Notifications (13)</h2>
        <button style={styles.updateAll} onClick={() => alert('All notifications marked as read')}>Update All</button>
      </div>

      {/* FILTER SECTION */}
      <div style={styles.filterBar}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={styles.filterBtn(filter === cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* LIST SECTION */}
      <div style={{ minHeight: '400px' }}>
        {filteredNotifs.map(n => (
          <div key={n.id} style={styles.notifCard}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0ea5e9', display: 'block' }}>{n.type.toUpperCase()}</span>
              <p style={{ margin: '5px 0', color: '#1e293b', fontWeight: '500' }}>{n.msg}</p>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{n.category} • {n.time}</span>
            </div>
            <button style={{ border: 'none', background: 'none', color: '#cbd5e1', cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div style={{ height: '60px' }}>
        <button style={styles.clearAll} onClick={() => alert('All notifications cleared')}>Clear All</button>
      </div>
    </div>
  );
};

export default NotificationModule;
