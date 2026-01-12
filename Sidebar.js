import React from 'react';
import { LayoutDashboard, Map, Ship, Anchor, BarChart3, User, Bell } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, userRole }) => {
  // Define all possible menu items
  const allItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20}/> },
    { id: 'map', label: 'Live Map', icon: <Map size={20}/> },
    { id: 'vessels', label: 'Vessels', icon: <Ship size={20}/> },
    { id: 'ports', label: 'Ports', icon: <Anchor size={20}/> },
    { id: 'analysis', label: 'Analysis', icon: <BarChart3 size={20}/> },
  ];

  // Role-based filter logic
  const rolePermissions = {
    operator: ['overview', 'map', 'vessels', 'ports', 'analysis'],
    analyst: ['map', 'analysis'],
    admin: ['overview', 'ports', 'vessels']
  };

  // Get only the items allowed for the current role
  const allowedIds = rolePermissions[userRole.toLowerCase()] || [];
  const menuItems = allItems.filter(item => allowedIds.includes(item.id));

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>⚓ MVTPS COMMAND</div>
      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.navItem,
              backgroundColor: activeTab === item.id ? '#1e293b' : 'transparent',
              color: activeTab === item.id ? '#38bdf8' : '#94a3b8'
            }}
          >
            {item.icon}
            <span style={{ marginLeft: '12px' }}>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: { width: '260px', height: '100vh', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', padding: '20px' },
  logo: { color: '#38bdf8', fontSize: '18px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' },
  nav: { display: 'flex', flexDirection: 'column', gap: '8px' },
  navItem: { display: 'flex', alignItems: 'center', padding: '12px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }
};

export default Sidebar;