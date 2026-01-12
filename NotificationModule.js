import React, { useState } from 'react';
import { ArrowLeft, Trash2, CheckCircle, Bell, AlertTriangle, Info } from 'lucide-react';

const NotificationModule = ({ onBack, setCount }) => {
  // Initializing with 13 mock notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "High wind warning in North Atlantic (Sector 4)", type: "risk", time: "2 mins ago" },
    { id: 2, text: "Vessel 'Ever Given' entered Suez Canal", type: "info", time: "15 mins ago" },
    { id: 3, text: "Piracy alert updated for Gulf of Aden", type: "risk", time: "1 hour ago" },
    { id: 4, text: "Port of Singapore: Terminal 3 now active", type: "success", time: "2 hours ago" },
    { id: 5, text: "System maintenance scheduled for 03:00 UTC", type: "info", time: "3 hours ago" },
    { id: 6, text: "Collision risk detected: Maersk vs. Fishing vessel", type: "risk", time: "4 hours ago" },
    { id: 7, text: "New maritime regulation PDF available", type: "info", time: "5 hours ago" },
    { id: 8, text: "Vessel 'Stellar Voyager' speed drop detected", type: "risk", time: "6 hours ago" },
    { id: 9, text: "Fuel efficiency report generated for October", type: "success", time: "8 hours ago" },
    { id: 10, text: "Unauthorized zone entry: Arctic Sector B", type: "risk", time: "12 hours ago" },
    { id: 11, text: "Port Rotterdam: Loading delay cleared", type: "success", time: "1 day ago" },
    { id: 12, text: "Route deviation alert: MSC Isabella", type: "risk", time: "1 day ago" },
    { id: 13, text: "User profile updated successfully", type: "info", time: "2 days ago" },
  ]);

  const handleClearAll = () => {
    setNotifications([]);
    setCount(0); // Updates the badge count on the main dashboard
  };

  const handleUpdateAll = () => {
    alert("All 13 notifications have been synced and updated with the server.");
    // Logic to mark all as read could go here
  };

  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={onBack} style={styles.backBtn}>
            <ArrowLeft size={18} /> Go Back
          </button>
          <h2 style={{ margin: 0 }}>Notifications ({notifications.length})</h2>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleUpdateAll} style={styles.updateBtn}>Update All</button>
          <button onClick={handleClearAll} style={styles.clearBtn}>
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* NOTIFICATION LIST */}
      <div style={styles.listContainer}>
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n.id} style={styles.notifCard}>
              <div style={styles.iconContainer}>
                {n.type === 'risk' && <AlertTriangle color="#ef4444" size={20} />}
                {n.type === 'info' && <Info color="#3b82f6" size={20} />}
                {n.type === 'success' && <CheckCircle color="#22c55e" size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.notifText}>{n.text}</div>
                <div style={styles.notifTime}>{n.time}</div>
              </div>
              <div style={styles.statusDot} />
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>
            <Bell size={48} color="#cbd5e1" />
            <p>Your inbox is clear!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { background: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
  header: { padding: '20px 25px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid #e2e8f0', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', color: '#64748b' },
  updateBtn: { background: '#0ea5e9', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  clearBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fef2f2', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  listContainer: { maxHeight: 'calc(100vh - 250px)', overflowY: 'auto', padding: '10px 25px' },
  notifCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f8fafc' },
  iconContainer: { width: '40px', height: '40px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  notifText: { fontSize: '14px', fontWeight: '500', color: '#1e293b' },
  notifTime: { fontSize: '12px', color: '#94a3b8', marginTop: '4px' },
  statusDot: { width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' },
  emptyState: { padding: '100px', textAlign: 'center', color: '#94a3b8' }
};

export default NotificationModule;