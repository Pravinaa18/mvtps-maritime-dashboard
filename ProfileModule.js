import React from 'react';
import { User, Shield, Mail, Calendar, LogOut, ArrowLeft, Settings, Bell } from 'lucide-react';

const ProfileModule = ({ userRole, onLogout, onBack }) => {
  // Current date for the "Member Since" field
  const joinDate = "January 2024";

  return (
    <div style={styles.container}>
      {/* Top Navigation for Profile */}
      <div style={styles.topBar}>
        <button onClick={onBack} style={styles.backBtn}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <h2 style={styles.title}>User Profile</h2>
        <div style={{ width: '120px' }}></div> {/* Spacer for alignment */}
      </div>

      <div style={styles.profileLayout}>
        {/* Left Side: Avatar & Main Actions */}
        <div style={styles.cardLeft}>
          <div style={styles.avatarCircle}>
            <User size={60} color="#0ea5e9" />
          </div>
          <h1 style={styles.userName}>Pravinaa</h1>
          <div style={styles.roleBadge}>
            <Shield size={14} /> {userRole?.toUpperCase()}
          </div>
          
          <div style={styles.actionMenu}>
            <button style={styles.menuItem}><Settings size={18} /> Account Settings</button>
            <button style={styles.menuItem}><Bell size={18} /> Alert Preferences</button>
          </div>

          <button onClick={onLogout} style={styles.logoutBtn}>
            <LogOut size={18} /> Logout from MVTPS
          </button>
        </div>

        {/* Right Side: Account Details */}
        <div style={styles.cardRight}>
          <h3 style={styles.sectionTitle}>Account Information</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <Mail size={18} color="#64748b" />
              <div>
                <label style={styles.label}>Email Address</label>
                <div style={styles.value}>pravinaa@mvtps-portal.com</div>
              </div>
            </div>
            <div style={styles.infoItem}>
              <Calendar size={18} color="#64748b" />
              <div>
                <label style={styles.label}>Member Since</label>
                <div style={styles.value}>{joinDate}</div>
              </div>
            </div>
            <div style={styles.infoItem}>
              <Shield size={18} color="#64748b" />
              <div>
                <label style={styles.label}>System Access</label>
                <div style={styles.value}>
                  {userRole === 'operator' ? 'Full Control' : 'Restricted Access'}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.permissionsSection}>
            <h3 style={styles.sectionTitle}>Your Permissions</h3>
            <div style={styles.tagGroup}>
              {userRole === 'operator' && ['Overview', 'Live Map', 'Ports', 'Vessels', 'Analysis'].map(p => (
                <span key={p} style={styles.tag}>{p}</span>
              ))}
              {userRole === 'analyst' && ['Live Map', 'Analysis'].map(p => (
                <span key={p} style={styles.tag}>{p}</span>
              ))}
              {userRole === 'admin' && ['Overview', 'Ports', 'Vessels'].map(p => (
                <span key={p} style={styles.tag}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '20px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  backBtn: { display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '500' },
  title: { margin: 0, color: '#0f172a' },
  profileLayout: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '25px' },
  cardLeft: { background: 'white', padding: '40px 20px', borderRadius: '20px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  avatarCircle: { width: '120px', height: '120px', background: '#f0f9ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
  userName: { margin: '0 0 10px 0', fontSize: '24px', color: '#0f172a' },
  roleBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0f172a', color: 'white', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  actionMenu: { width: '100%', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' },
  menuItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', border: 'none', borderRadius: '10px', cursor: 'pointer', color: '#475569', fontSize: '14px', textAlign: 'left' },
  logoutBtn: { marginTop: '40px', width: '100%', padding: '15px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  cardRight: { background: 'white', padding: '35px', borderRadius: '20px', border: '1px solid #e2e8f0' },
  sectionTitle: { fontSize: '16px', color: '#0f172a', marginBottom: '20px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' },
  infoItem: { display: 'flex', alignItems: 'start', gap: '15px' },
  label: { fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold' },
  value: { fontSize: '15px', color: '#1e293b', fontWeight: '500', marginTop: '4px' },
  permissionsSection: { marginTop: '20px' },
  tagGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  tag: { background: '#f1f5f9', color: '#475569', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', border: '1px solid #e2e8f0' }
};

export default ProfileModule;