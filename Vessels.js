import React, { useState } from 'react';
import { Search, Ship, Bell, CheckCircle, Flag, Info, ArrowLeft, Trash2, Filter } from 'lucide-react';

const Vessels = ({ addNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [subscribedVessels, setSubscribedVessels] = useState({});
  const [showVesselNotifs, setShowVesselNotifs] = useState(false);

  // Data for 14 Vessels
  const vesselData = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Ocean Voyager ${100 + i}` : `Global Tanker ${200 + i}`,
    type: i % 2 === 0 ? "Cargo" : "Tanker",
    flag: i % 3 === 0 ? "Panama" : "Marshall Islands",
    country: i % 3 === 0 ? "Panama" : "USA",
    IMO: `9234${i}5`,
    MMSI: `23500${i}12`,
    status: "Under Way"
  }));

  const handleSubscribe = (vessel) => {
    setSubscribedVessels(prev => ({ ...prev, [vessel.id]: true }));
    // Trigger global notification at top
    addNotification(`Subscribed to ${vessel.name} alerts`);
  };

  const filteredVessels = vesselData.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         v.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || v.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={styles.container}>
      {/* 1. TOP HEADER: Search, Filters, and Bell */}
      <div style={styles.header}>
        <div style={styles.searchBox}>
          <Search size={18} color="#94a3b8" />
          <input 
            placeholder="Search vessel name or type..." 
            style={styles.input} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div style={styles.filterGroup}>
          <Filter size={16} color="#64748b" />
          <button 
            onClick={() => setFilterType('All')} 
            style={filterType === 'All' ? styles.activeFilter : styles.filterBtn}
          >All</button>
          <button 
            onClick={() => setFilterType('Cargo')} 
            style={filterType === 'Cargo' ? styles.activeFilter : styles.filterBtn}
          >Cargo</button>
          <button 
            onClick={() => setFilterType('Tanker')} 
            style={filterType === 'Tanker' ? styles.activeFilter : styles.filterBtn}
          >Tanker</button>
        </div>

        <button style={styles.bellBtn} onClick={() => setShowVesselNotifs(true)}>
          <Bell size={22} />
          {Object.keys(subscribedVessels).length > 0 && <span style={styles.badge}></span>}
        </button>
      </div>

      <div style={styles.mainContent}>
        {/* 2. VESSEL LIST (14 Vessels) */}
        <div style={styles.listSide}>
          <h4 style={{margin: '0 0 15px 0', color: '#1e293b'}}>Vessels Nearby</h4>
          {filteredVessels.map(v => (
            <div key={v.id} style={styles.vesselCard} onClick={() => setSelectedVessel(v)}>
              <div style={styles.vesselMain}>
                <Ship size={24} color="#0ea5e9" />
                <div>
                  <div style={styles.vesselName}>{v.name}</div>
                  <div style={styles.vesselSubtitle}>{v.type} • {v.flag}</div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleSubscribe(v); }}
                style={subscribedVessels[v.id] ? styles.subbedBtn : styles.subBtn}
              >
                {subscribedVessels[v.id] ? <CheckCircle size={14}/> : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>

        {/* 3. VESSEL DETAILS PANEL */}
        <div style={styles.detailSide}>
          {selectedVessel ? (
            <div style={styles.detailCard}>
               <div style={styles.detailTitle}>
                 <Ship size={32} color="#0ea5e9" />
                 <h3>{selectedVessel.name}</h3>
               </div>
               <div style={styles.specsGrid}>
                  <div style={styles.specItem}><Info size={16}/> <strong>Type:</strong> {selectedVessel.type}</div>
                  <div style={styles.specItem}><Flag size={16}/> <strong>Flag:</strong> {selectedVessel.flag}</div>
                  <div style={styles.specItem}><strong>Country:</strong> {selectedVessel.country}</div>
                  <div style={styles.specItem}><strong>IMO:</strong> {selectedVessel.IMO}</div>
                  <div style={styles.specItem}><strong>MMSI:</strong> {selectedVessel.MMSI}</div>
                  <div style={styles.specItem}><strong>Status:</strong> {selectedVessel.status}</div>
               </div>
            </div>
          ) : (
            <div style={styles.emptyState}>
              <Ship size={48} color="#e2e8f0" />
              <p>Select a vessel to view full technical details</p>
            </div>
          )}
        </div>
      </div>

      {/* 4. NOTIFICATION OVERLAY */}
      {showVesselNotifs && (
        <div style={styles.overlay}>
          <div style={styles.notifPanel}>
            <div style={styles.notifHeader}>
              <button onClick={() => setShowVesselNotifs(false)} style={styles.backBtn}>
                <ArrowLeft size={16}/> Go Back
              </button>
              <button onClick={() => setSubscribedVessels({})} style={styles.clearBtn}>
                <Trash2 size={16}/> Clear All
              </button>
            </div>
            <div style={styles.notifContent}>
              <h3 style={{fontSize: '18px'}}>Alert Notifications</h3>
              {Object.keys(subscribedVessels).length === 0 ? (
                <p style={{color: '#94a3b8'}}>No active vessel alerts.</p>
              ) : (
                Object.keys(subscribedVessels).map(id => (
                  <div key={id} style={styles.notifItem}>
                    <div style={styles.notifDot}></div>
                    Subscribed to {vesselData.find(v => v.id == id)?.name} Alerts
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' },
  header: { display: 'flex', gap: '20px', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '15px', border: '1px solid #e2e8f0' },
  searchBox: { flex: 1, display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '10px 15px', borderRadius: '10px' },
  input: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  filterGroup: { display: 'flex', gap: '8px', alignItems: 'center' },
  filterBtn: { padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '13px' },
  activeFilter: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#0f172a', color: 'white', cursor: 'pointer', fontSize: '13px' },
  bellBtn: { position: 'relative', padding: '10px', borderRadius: '10px', border: 'none', background: '#f1f5f9', cursor: 'pointer' },
  badge: { position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%', border: '2px solid white' },
  mainContent: { display: 'grid', gridTemplateColumns: '400px 1fr', gap: '20px', flex: 1, minHeight: 0 },
  listSide: { background: 'white', padding: '20px', borderRadius: '15px', overflowY: 'auto', border: '1px solid #e2e8f0' },
  vesselCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderRadius: '10px', border: '1px solid #f1f5f9', marginBottom: '10px', cursor: 'pointer', transition: '0.2s' },
  vesselMain: { display: 'flex', alignItems: 'center', gap: '12px' },
  vesselName: { fontWeight: 'bold', fontSize: '14px', color: '#0f172a' },
  vesselSubtitle: { fontSize: '11px', color: '#64748b' },
  subBtn: { background: '#f1f5f9', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' },
  subbedBtn: { background: '#22c55e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' },
  detailSide: { background: 'white', borderRadius: '15px', border: '1px solid #e2e8f0', padding: '30px' },
  detailCard: { width: '100%' },
  detailTitle: { display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '25px' },
  specsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  specItem: { fontSize: '15px', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' },
  emptyState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', gap: '15px' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 9999, display: 'flex', justifyContent: 'flex-end' },
  notifPanel: { width: '380px', background: 'white', height: '100%', boxShadow: '-5px 0 20px rgba(0,0,0,0.1)' },
  notifHeader: { padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' },
  backBtn: { border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b', cursor: 'pointer' },
  clearBtn: { border: 'none', background: 'none', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' },
  notifContent: { padding: '25px' },
  notifItem: { padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '10px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' },
  notifDot: { width: '6px', height: '6px', background: '#0ea5e9', borderRadius: '50%' }
};

export default Vessels;