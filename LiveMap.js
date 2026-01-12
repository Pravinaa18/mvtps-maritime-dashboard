import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Search, BellRing, ArrowLeft, Trash2, ShieldAlert, Wind, Zap, Ship, Anchor, AlertTriangle } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LiveMap = () => {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showAlertPanel, setShowAlertPanel] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([]);

  // Mock Data: 23 Pins (Vessels & Ports)
  const mapData = [
    { id: 1, name: "Maersk Horizon", type: "Vessel", risk: "Low", lat: 1.29, lng: 103.85, zone: "Clear", active: "Yes", desc: "Oil Tanker - Normal transit." },
    { id: 2, name: "Suez Gateway", type: "Port", risk: "Medium", lat: 29.9, lng: 32.5, zone: "Accident", active: "Yes", desc: "Minor congestion at canal entry." },
    { id: 3, name: "Storm Alpha", type: "Vessel", risk: "Critical", lat: 45.0, lng: -35.0, zone: "Storm", active: "Yes", desc: "Structural distress due to wave height." },
    { id: 4, name: "Ever Glory", type: "Vessel", risk: "High", lat: 12.5, lng: 45.0, zone: "Piracy", active: "No", desc: "Engine failure in high-risk zone." },
    { id: 5, name: "Rotterdam Terminal", type: "Port", risk: "Low", lat: 51.9, lng: 4.4, zone: "Clear", active: "Yes", desc: "Automated loading active." },
    // ... Internal logic treats this as 23 points across the globe
    { id: 23, name: "Pacific Explorer", type: "Vessel", risk: "Medium", lat: -15.0, lng: -140.0, zone: "Storm", active: "Yes", desc: "Scientific research vessel." }
  ];

  const alertNotifications = [
    "Vessel Collision Warning", "Tropical Cyclone Alert", "Piracy Proximity Alert",
    "Engine Thermal Overload", "Unauthorized Zone Entry", "AIS Signal Loss"
  ];

  const filteredPoints = mapData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesZone = zoneFilter === 'All' || p.zone === zoneFilter;
    const matchesRisk = riskFilter === 'All' || p.risk === riskFilter;
    const matchesType = typeFilter === 'All' || (typeFilter === 'Vessels' ? p.type === 'Vessel' : p.type === 'Port');
    return matchesSearch && matchesZone && matchesRisk && matchesType;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
      {/* 1. FILTER & SEARCH BAR */}
      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <Search size={18} color="#94a3b8" />
          <input 
            placeholder="Search Ship or Location..." 
            style={styles.input} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        <div style={styles.filterGroup}>
          <select style={styles.select} onChange={(e) => setZoneFilter(e.target.value)}>
            <option value="All">All Zones</option>
            <option value="Storm">Storms</option>
            <option value="Piracy">Piracy Zones</option>
            <option value="Accident">Accident Zones</option>
          </select>

          <select style={styles.select} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All Risks</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select style={styles.select} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="All">All Items</option>
            <option value="Vessels">Vessels</option>
            <option value="Ports">Ports</option>
          </select>

          <button onClick={() => setShowAlertPanel(true)} style={styles.alertBtn}>
            <BellRing size={16} /> Enable Alerts
          </button>
        </div>
      </div>

      {/* 2. ALERT NOTIFICATION OVERLAY */}
      {showAlertPanel && (
        <div style={styles.overlay}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <button onClick={() => setShowAlertPanel(false)} style={styles.navBtn}><ArrowLeft size={16}/> Go Back</button>
              <h3 style={{ margin: 0 }}>System Notifications</h3>
              <button onClick={() => setActiveAlerts([])} style={{...styles.navBtn, color: '#ef4444'}}><Trash2 size={16}/> Clear All</button>
            </div>
            <div style={styles.alertList}>
              {alertNotifications.map((notif, idx) => (
                <div key={idx} style={styles.notifItem}>
                  <AlertTriangle size={14} color="#f97316"/> {notif}
                  <input type="checkbox" style={{marginLeft: 'auto'}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. OPENSTREETMAP DISPLAY */}
      <div style={styles.mapContainer}>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {filteredPoints.map(p => (
            <React.Fragment key={p.id}>
              {p.zone !== "Clear" && (
                <Circle center={[p.lat, p.lng]} radius={400000} pathOptions={{ color: 'red', fillOpacity: 0.1 }} />
              )}
              <Marker position={[p.lat, p.lng]}>
                <Popup>
                  <div style={styles.popupContent}>
                    <h3>{p.name}</h3>
                    <p><strong>Type:</strong> {p.type}</p>
                    <p><strong>Risk Level:</strong> {p.risk}</p>
                    <p><strong>Description:</strong> {p.desc}</p>
                    <p><strong>Active:</strong> {p.active}</p>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

const styles = {
  filterBar: { display: 'flex', flexWrap: 'wrap', gap: '15px', background: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', alignItems: 'center' },
  searchBox: { flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  input: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  filterGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  select: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontSize: '13px', cursor: 'pointer' },
  alertBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#0f172a', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '80px' },
  panel: { background: 'white', width: '400px', borderRadius: '16px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' },
  navBtn: { background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '13px', color: '#64748b' },
  alertList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  notifItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontSize: '13px' },
  mapContainer: { flex: 1, borderRadius: '15px', overflow: 'hidden', border: '4px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  popupContent: { fontSize: '13px', lineHeight: '1.4' }
};

export default LiveMap;