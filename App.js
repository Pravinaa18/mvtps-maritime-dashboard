import React, { useState } from 'react';
import { 
  Ship, Eye, Globe, Anchor, BarChart3, User, Bell, 
  AlertTriangle, ChevronLeft, LogOut, Mail, Lock, 
  ShieldAlert, Activity, Navigation, Clock, Flag, HardHat, Search, X
} from 'lucide-react';

export default function App() {
  // State Management
  const [view, setView] = useState('login'); 
  const [tab, setTab] = useState('Overview');
  const [showNotif, setShowNotif] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, text: "NOAA Alert: Storm 'Alpha' tracking North-West.", time: "2m ago", type: "weather" },
    { id: 2, text: "Port Congestion: Singapore wait time > 24h.", time: "1h ago", type: "port" },
    { id: 3, text: "Safety: Piracy activity reported near Gulf of Aden.", time: "3h ago", type: "safety" }
  ]);

  // Theme Colors
  const theme = {
    navy: '#1b2b48',
    sky: '#3fbcf1',
    lightSky: '#a2dff7',
    white: '#ffffff',
    bg: '#f4f7f9',
    border: '#e2e8f0',
    red: '#ff5b5b',
    green: '#2ecc71',
    text: '#1e293b'
  };

  // Mock Data
  const vesselList = [
    { name: "Ever Given", loc: "Suez Canal", speed: "14.5 kn", date: "2026-01-02", type: "Container", cargo: "Electronics", destination: "Rotterdam", flag: "Panama", operator: "Evergreen", pos: "30.0° N, 32.5° E" },
    { name: "Northern Star", loc: "Gulf of Aden", speed: "12.1 kn", date: "2026-01-02", type: "Tanker", cargo: "Crude Oil", destination: "Liberia", flag: "Liberia", operator: "Polar Shipping", pos: "12.0° N, 45.0° E" },
    { name: "Pacific Dawn", loc: "North Pacific", speed: "15.8 kn", date: "2026-01-02", type: "Cargo", cargo: "Cars", destination: "LA", flag: "USA", operator: "Oceanic", pos: "35.2° N, 140.5° W" },
    { name: "MV Ocean Titan", loc: "Malacca Strait", speed: "13.4 kn", date: "2026-01-02", type: "Container", cargo: "Machinery", destination: "Singapore", flag: "Singapore", operator: "Global Log", pos: "1.2° N, 103.8° E" },
    { name: "SS Sea Pearl", loc: "Atlantic", speed: "10.2 kn", date: "2026-01-02", type: "LNG", cargo: "Gas", destination: "London", flag: "UK", operator: "Chevron", pos: "45.7° N, 20.2° W" },
    { name: "Blue Wave", loc: "South China Sea", speed: "14.0 kn", date: "2026-01-02", type: "Cargo", cargo: "Retail", destination: "Shanghai", flag: "China", operator: "COSCO", pos: "22.2° N, 114.1° E" },
    { name: "Nordic Star", loc: "North Sea", speed: "11.9 kn", date: "2026-01-02", type: "Ro-Ro", cargo: "Vehicles", destination: "Hamburg", flag: "Germany", operator: "Maersk", pos: "54.1° N, 7.5° E" },
    { name: "Delta Sky", loc: "Persian Gulf", speed: "16.1 kn", date: "2026-01-02", type: "Tanker", cargo: "Fuel", destination: "Dubai", flag: "UAE", operator: "Adnoc", pos: "25.0° N, 55.0° E" }
  ];

  const portList = [
    { name: "Port of Singapore", loc: "Singapore", vessels: 145, wait: "12h", speed: "12.5 kn" },
    { name: "Port of Rotterdam", loc: "Netherlands", vessels: 89, wait: "24h", speed: "11.2 kn" },
    { name: "Jebel Ali Port", loc: "UAE", vessels: 67, wait: "14h", speed: "14.2 kn" },
    { name: "Port of Shanghai", loc: "China", vessels: 210, wait: "38h", speed: "13.1 kn" },
    { name: "Port of Hamburg", loc: "Germany", vessels: 54, wait: "30h", speed: "11.8 kn" },
    { name: "Port of Los Angeles", loc: "USA", vessels: 42, wait: "72h", speed: "10.5 kn" }
  ];

  // --- 1. LOGIN & SIGNUP VIEWS ---
  if (view === 'login' || view === 'signup') {
    return (
      <div style={{ height: '100vh', width: '100vw', backgroundColor: theme.lightSky, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', width: '420px', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#e0f2fe', padding: '20px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 20px' }}><Ship color={theme.sky} size={48} /></div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: theme.navy, marginBottom: '5px' }}>MVTPS</h1>
          <p style={{ color: theme.sky, fontWeight: 'bold', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '35px' }}>Command Portal</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', marginLeft: '5px' }}>USERNAME</label>
              <input type="text" defaultValue="Pravinaa" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: `1px solid ${theme.border}`, marginTop: '5px', boxSizing: 'border-box' }} />
            </div>
            {view === 'signup' && (
              <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', marginLeft: '5px' }}>MAIL ID</label>
                <input type="text" defaultValue="Pravinaa@gmail.com" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: `1px solid ${theme.border}`, marginTop: '5px', boxSizing: 'border-box' }} />
              </div>
            )}
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', marginLeft: '5px' }}>PASSWORD</label>
              <input type="password" defaultValue="123456" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: `1px solid ${theme.border}`, marginTop: '5px', boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setView('dashboard')} style={{ backgroundColor: theme.sky, color: 'white', padding: '18px', borderRadius: '15px', border: 'none', fontWeight: '900', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase' }}>
              {view === 'login' ? 'Login Option' : 'Signup Option'}
            </button>
          </div>
          <p onClick={() => setView(view === 'login' ? 'signup' : 'login')} style={{ marginTop: '25px', fontSize: '13px', color: theme.sky, cursor: 'pointer', fontWeight: 'bold' }}>
            {view === 'login' ? "Switch to Signup" : "Switch to Login"}
          </p>
        </div>
      </div>
    );
  }

  // --- 2. PROFILE VIEW ---
  if (view === 'profile') {
    return (
      <div style={{ backgroundColor: 'white', height: '100vh', padding: '60px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
             <button onClick={() => setView('dashboard')} style={{ border: 'none', background: '#f1f5f9', color: theme.navy, padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <ChevronLeft size={18}/> GO BACK
             </button>
             {profileMsg && <div style={{ color: theme.green, fontWeight: '900', fontSize: '14px', textTransform: 'uppercase' }}>{profileMsg}</div>}
          </header>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ backgroundColor: theme.navy, padding: '25px', borderRadius: '50%', width: 'fit-content', margin: '0 auto 20px' }}><User size={50} color="white"/></div>
            <h2 style={{ fontSize: '28px', fontWeight: '900' }}>Pravinaa Profile</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ProfileInput label="Username" val="Pravinaa" />
            <ProfileInput label="Password" val="123456" type="password" />
            <ProfileInput label="Mail ID" val="Pravinaa@gmail.com" />
            <ProfileInput label="Assigned Role" val="Operator" disabled />
            <button onClick={() => { setProfileMsg("Profile Updated Successfully!"); setTimeout(() => setProfileMsg(""), 3000); }} style={{ backgroundColor: theme.sky, color: 'white', padding: '20px', borderRadius: '15px', border: 'none', fontWeight: '900', cursor: 'pointer', marginTop: '20px' }}>UPDATE ALL DETAILS</button>
            <button onClick={() => setView('login')} style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '15px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <LogOut size={18}/> LOGOUT OPTION
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. ALL NOTIFICATIONS VIEW ---
  if (view === 'all-notifs') {
    return (
      <div style={{ backgroundColor: theme.bg, height: '100vh', padding: '60px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button onClick={() => setView('dashboard')} style={{ border: 'none', background: 'white', color: theme.sky, padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' }}>
             <ChevronLeft size={18} style={{ verticalAlign: 'middle' }}/> GO BACK
          </button>
          <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>System Notifications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {notifs.map(n => (
              <div key={n.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '20px', borderLeft: `6px solid ${theme.sky}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: theme.text }}>{n.text}</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{n.time}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setNotifs([])} style={{ marginTop: '40px', backgroundColor: 'transparent', border: `2px solid ${theme.red}`, color: theme.red, padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>CLEAR ALL NOTIFICATIONS</button>
        </div>
      </div>
    );
  }

  // --- 4. MAIN DASHBOARD ---
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* LEFT SIDEBAR (NAVY BLUE) */}
      <aside style={{ width: '280px', backgroundColor: theme.navy, color: 'white', display: 'flex', flexDirection: 'column', padding: '30px 20px', shrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '50px', paddingLeft: '10px' }}>
          <Ship color={theme.sky} size={32} />
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: theme.sky, margin: 0, letterSpacing: '-1px' }}>MVTPS</h1>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavBtn active={tab === 'Overview'} onClick={() => setTab('Overview')} label="Overview" icon={<Eye size={20}/>} />
          <NavBtn active={tab === 'Live Map'} onClick={() => setTab('Live Map')} label="Live Map" icon={<Globe size={20}/>} />
          <NavBtn active={tab === 'Ports'} onClick={() => setTab('Ports')} label="Ports" icon={<Anchor size={20}/>} />
          <NavBtn active={tab === 'Vessels'} onClick={() => setTab('Vessels')} label="Vessels" icon={<Ship size={20}/>} />
          <NavBtn active={tab === 'Analysis'} onClick={() => setTab('Analysis')} label="Analysis" icon={<BarChart3 size={20}/>} />
        </nav>
      </aside>

      {/* RIGHT CONTENT PANEL (WHITE DASHBOARD) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: theme.bg, overflow: 'hidden' }}>
        
        {/* HEADER */}
        <header style={{ height: '80px', backgroundColor: 'white', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', shrink: 0 }}>
          <h2 style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', letterSpacing: '2px', textTransform: 'uppercase' }}>{tab}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={{ position: 'relative' }}>
              <Bell onClick={() => setShowNotif(!showNotif)} style={{ cursor: 'pointer', color: '#64748b' }} size={24} />
              {showNotif && (
                <div style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: 'white', width: '320px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', border: `1px solid ${theme.border}`, zIndex: 1000, padding: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', borderBottom: `1px solid ${theme.border}`, paddingBottom: '10px', marginBottom: '15px' }}>LATEST NOTIFICATIONS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {notifs.slice(0, 3).map(n => (
                      <div key={n.id} style={{ fontSize: '13px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: `4px solid ${theme.sky}` }}>{n.text}</div>
                    ))}
                  </div>
                  <button onClick={() => {setView('all-notifs'); setShowNotif(false);}} style={{ width: '100%', padding: '15px 0 0 0', border: 'none', background: 'none', color: theme.sky, fontWeight: 'bold', cursor: 'pointer', borderTop: `1px solid ${theme.border}`, marginTop: '15px' }}>VIEW ALL NOTIFICATIONS</button>
                </div>
              )}
            </div>
            <div onClick={() => setView('profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: `1px solid ${theme.border}`, paddingLeft: '30px', cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#e0f2fe', padding: '10px', borderRadius: '50%', color: theme.sky }}><User size={20} /></div>
              <span style={{ fontWeight: 'bold', fontSize: '14px', color: theme.text }}>Pravinaa</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div style={{ padding: '40px', overflowY: 'auto', flex: 1 }}>
          
          {/* OVERVIEW TAB */}
          {tab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '25px' }}>
                <StatCard label="Active Alerts" val="07" info="Weather & Safety" color={theme.red} />
                <StatCard label="Active Ports" val="42" info="Global Terminals" color={theme.green} />
                <StatCard label="Active Vessels" val="1,248" info="Fleet in Transit" color={theme.sky} />
                <StatCard label="Avg Speed" val="13.2 kn" info="12-15 kn Range" color="#f59e0b" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '35px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontWeight: '900', marginBottom: '25px' }}>Recent Events</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <EventItem text="NOAA Storm Alert triggered for vessel 'Ever Given'." color={theme.red} />
                    <EventItem text="New congestion report from Port of Singapore." color={theme.sky} />
                    <EventItem text="Safety risk update: Gulf of Aden zone 4." color="#f59e0b" />
                  </div>
                </div>
                <div style={{ backgroundColor: theme.navy, padding: '35px', borderRadius: '35px', color: 'white' }}>
                  <h3 style={{ fontWeight: '900', color: theme.sky, marginBottom: '25px' }}>Live Vessels</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {vesselList.slice(0, 5).map(v => (
                      <div key={v.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{v.name}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: theme.sky }}>{v.loc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LIVE MAP TAB */}
{tab === 'Live Map' && (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
    
    {/* HEADINGS BOX FORMAT */}
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px 30px', 
      borderRadius: '20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: `1px solid ${theme.border}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ backgroundColor: theme.navy, padding: '10px', borderRadius: '12px' }}>
          <Globe color={theme.sky} size={24} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: theme.navy }}>Global Fleet Positioning</h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: 'bold' }}>REAL-TIME AIS DATA SERVICE</p>
        </div>
      </div>

      {/* FILTER BUTTON & CLICKABLE MENU */}
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setShowFilters(!showFilters)} 
          style={{ 
            backgroundColor: showFilters ? theme.sky : '#f1f5f9', 
            color: showFilters ? 'white' : theme.navy, 
            padding: '12px 25px', 
            borderRadius: '12px', 
            border: 'none', 
            fontWeight: '900', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            transition: '0.3s'
          }}
        >
          {showFilters ? <X size={18} /> : <Search size={18} />}
          {showFilters ? 'CLOSE FILTERS' : 'MAP FILTERS'}
        </button>

        {/* CLICKABLE FILTER MENU */}
        {showFilters && (
          <div style={{ 
            position: 'absolute', 
            top: '60px', 
            right: 0, 
            zIndex: 1000, 
            backgroundColor: 'white', 
            width: '260px', 
            padding: '25px', 
            borderRadius: '25px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)', 
            border: `1px solid ${theme.border}` 
          }}>
            <p style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Safety Layers (NOAA)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: theme.sky }} /> Storm Warnings
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: theme.sky }} /> Piracy Zones
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: theme.sky }} /> Traffic Density
              </label>
              <hr style={{ border: 'none', borderTop: `1px solid ${theme.border}`, margin: '10px 0' }} />
              <p style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', marginBottom: '5px', textTransform: 'uppercase' }}>Ship Types</p>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: theme.sky }} /> Cargo/Containers
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: theme.sky }} /> Tankers
              </label>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* NAVY BLUE MAP CONTAINER */}
    <div style={{ flex: 1, position: 'relative', borderRadius: '35px', overflow: 'hidden', border: `10px solid white`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <iframe 
        width="100%" 
        height="100%" 
        frameBorder="0" 
        title="Maritime Map"
        style={{ 
          filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)', 
          backgroundColor: theme.navy 
        }}
        src="https://www.openstreetmap.org/export/embed.html?bbox=-180,-60,180,80&layer=mapnik"
      ></iframe>

      {/* FLOATING SHIP INFO CARDS */}
      <div style={{ position: 'absolute', bottom: '30px', left: '30px', display: 'flex', gap: '20px' }}>
        {vesselList.slice(0, 2).map(v => (
          <div key={v.name} style={{ 
            backgroundColor: 'rgba(27, 43, 72, 0.9)', 
            backdropFilter: 'blur(10px)', 
            padding: '20px', 
            borderRadius: '20px', 
            border: `1px solid ${theme.sky}`,
            color: 'white',
            width: '240px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: '900', color: theme.sky, fontSize: '14px' }}>{v.name}</span>
              <Activity size={16} color={theme.green} />
            </div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{v.pos}</div>
            <div style={{ fontSize: '11px', opacity: 0.7 }}>SPEED: {v.speed} | STATUS: UNDERWAY</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

          {/* PORTS TAB */}
          {tab === 'Ports' && (
            <div style={{ backgroundColor: 'white', borderRadius: '35px', padding: '40px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${theme.border}`, color: '#94a3b8', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase' }}>
                    <th style={{ padding: '20px' }}>Port Name</th>
                    <th style={{ padding: '20px' }}>Location</th>
                    <th style={{ padding: '20px' }}>Vessels Present</th>
                    <th style={{ padding: '20px' }}>Avg Wait</th>
                    <th style={{ padding: '20px' }}>Avg Speed</th>
                  </tr>
                </thead>
                <tbody>
                  {portList.map(p => (
                    <tr key={p.name} style={{ borderBottom: '1px solid #f8fafc' }}>
                      <td style={{ padding: '25px', fontWeight: 'bold', color: theme.navy }}>{p.name}</td>
                      <td style={{ padding: '25px', color: '#64748b' }}>{p.loc}</td>
                      <td style={{ padding: '25px', fontWeight: 'bold', color: theme.sky }}>{p.vessels}</td>
                      <td style={{ padding: '25px', fontWeight: 'bold' }}>{p.wait}</td>
                      <td style={{ padding: '25px', fontWeight: 'bold' }}>{p.speed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VESSELS TAB */}
          {tab === 'Vessels' && (
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '30px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '30px', padding: '25px', maxHeight: '700px', overflowY: 'auto' }}>
                <h3 style={{ marginBottom: '25px', paddingLeft: '10px' }}>Fleet Registry</h3>
                {vesselList.map(v => (
                  <div key={v.name} onClick={() => setSelectedVessel(v)} style={{ padding: '18px 20px', borderRadius: '18px', cursor: 'pointer', marginBottom: '8px', transition: '0.2s', backgroundColor: selectedVessel?.name === v.name ? '#f0f9ff' : 'transparent', border: selectedVessel?.name === v.name ? `1px solid ${theme.sky}` : '1px solid transparent' }}>
                    <p style={{ margin: 0, fontWeight: 'bold', color: selectedVessel?.name === v.name ? theme.sky : theme.navy }}>{v.name}</p>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{v.type} | {v.flag}</span>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: 'white', borderRadius: '30px', padding: '50px' }}>
                {selectedVessel ? (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '20px' }}>
                      <h2 style={{ fontSize: '36px', fontWeight: '900', color: theme.navy, margin: 0 }}>{selectedVessel.name}</h2>
                      <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '8px 15px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>IN TRANSIT</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                      <DetailCard label="Current Location" val={selectedVessel.loc} icon={<Navigation size={18}/>} />
                      <DetailCard label="Average Speed" val={selectedVessel.speed} icon={<Activity size={18}/>} />
                      <DetailCard label="Position (Lat/Lng)" val={selectedVessel.pos} icon={<Globe size={18}/>} />
                      <DetailCard label="Report Date" val={selectedVessel.date} icon={<Clock size={18}/>} />
                      <DetailCard label="Cargo Type" val={selectedVessel.cargo} icon={<BarChart3 size={18}/>} />
                      <DetailCard label="Destination" val={selectedVessel.destination} icon={<Flag size={18}/>} />
                      <DetailCard label="Flag State" val={selectedVessel.flag} icon={<ShieldAlert size={18}/>} />
                      <DetailCard label="Vessel Operator" val={selectedVessel.operator} icon={<HardHat size={18}/>} />
                    </div>
                  </div>
                ) : (
                  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.3 }}>
                    <Ship size={80} />
                    <p style={{ fontWeight: 'bold', marginTop: '20px' }}>SELECT A VESSEL TO VIEW DETAILS</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANALYSIS TAB */}
          {tab === 'Analysis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ backgroundColor: theme.navy, color: 'white', padding: '50px', borderRadius: '45px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h2 style={{ fontSize: '32px', color: theme.sky, marginBottom: '15px' }}>UNCTAD Trade Integration</h2>
                  <p style={{ maxWidth: '600px', opacity: 0.7, lineHeight: 1.6 }}>Monitoring Liner Shipping Connectivity Index (LSCI) and global trade congestion patterns. High-resolution analysis of port efficiency and arrivals.</p>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
                     <AnCard label="Wait Time Delta" val="+2.4h" color={theme.red} />
                     <AnCard label="Arrival Variance" val="-15%" color={theme.green} />
                     <AnCard label="Efficiency Index" val="1.8x" color={theme.sky} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                 <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '35px' }}>
                    <h3 style={{ marginBottom: '25px' }}>Port Dashboard Metrics</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                       <MetricRow label="Avg Wait Times" val="18.5 hrs" />
                       <MetricRow label="Arrivals (24h)" val="142 Ships" />
                       <MetricRow label="Congestion Risk" val="CRITICAL" alert />
                    </div>
                 </div>
                 <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '35px' }}>
                    <h3 style={{ marginBottom: '25px' }}>NOAA Safety Overlay</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                       <MetricRow label="Storm Risk Zones" val="04 Active" />
                       <MetricRow label="Piracy Incidents" val="None (24h)" />
                       <MetricRow label="Weather Trigger" val="Wind > 45kn" alert />
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const NavBtn = ({ active, onClick, label, icon }) => (
  <button onClick={onClick} style={{
    width: '100%', padding: '16px 20px', borderRadius: '18px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px', fontWeight: 'bold', fontSize: '15px', transition: '0.3s',
    backgroundColor: active ? '#3fbcf1' : 'transparent',
    color: active ? 'white' : '#94a3b8'
  }}>
    {icon} {label}
  </button>
);

const StatCard = ({ label, val, info, color }) => (
  <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '30px', flex: 1, borderLeft: `10px solid ${color}`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
    <p style={{ margin: '0 0 8px 0', fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>{label}</p>
    <h3 style={{ margin: '0 0 5px 0', fontSize: '36px', fontWeight: '900', color: '#1e293b' }}>{val}</h3>
    <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>{info}</p>
  </div>
);

const EventItem = ({ text, color }) => (
  <div style={{ padding: '18px', borderRadius: '15px', borderLeft: `5px solid ${color}`, backgroundColor: '#f8fafc', fontSize: '14px', fontWeight: '500', color: '#334155' }}>
    {text}
  </div>
);

const ProfileInput = ({ label, val, type = "text", disabled = false }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>{label}</label>
    <input type={type} defaultValue={val} disabled={disabled} style={{ padding: '16px', borderRadius: '15px', border: '1px solid #e2e8f0', backgroundColor: disabled ? '#f8fafc' : 'white', fontWeight: 'bold', color: '#1e293b' }} />
  </div>
);

const DetailCard = ({ label, val, icon }) => (
  <div style={{ backgroundColor: '#f8fafc', padding: '25px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#3fbcf1' }}>
       {icon} <span style={{ fontSize: '10px', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>{label}</span>
    </div>
    <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>{val}</p>
  </div>
);

const AnCard = ({ label, val, color }) => (
  <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
    <p style={{ margin: '0 0 5px 0', fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>{label}</p>
    <p style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: color }}>{val}</p>
  </div>
);

const MetricRow = ({ label, val, alert }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #f1f5f9' }}>
    <span style={{ color: '#64748b', fontWeight: '500' }}>{label}</span>
    <span style={{ fontWeight: 'bold', color: alert ? '#ff5b5b' : '#1e293b' }}>{val}</span>
  </div>
);