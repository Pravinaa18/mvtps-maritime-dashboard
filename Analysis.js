import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Anchor, 
  Clock, 
  ShieldAlert, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

const Analysis = () => {
  // Mock data for display
  const stats = [
    { label: "Avg Port Stay", value: "14.2h", change: "+1.2h", trendingUp: true, icon: <Clock size={20} color="#0ea5e9"/> },
    { label: "Active Subscriptions", value: "24", change: "+4", trendingUp: true, icon: <Activity size={20} color="#22c55e"/> },
    { label: "Fleet Efficiency", value: "92%", change: "-2%", trendingUp: false, icon: <TrendingUp size={20} color="#6366f1"/> },
    { label: "Risk Alerts", value: "3", change: "Stable", trendingUp: null, icon: <ShieldAlert size={20} color="#ef4444"/> },
  ];

  return (
    <div style={styles.container}>
      {/* 1. TOP KPI CARDS */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={styles.statIcon}>{stat.icon}</div>
              {stat.trendingUp !== null && (
                <span style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '12px', 
                  color: stat.trendingUp ? '#22c55e' : '#ef4444' 
                }}>
                  {stat.trendingUp ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                  {stat.change}
                </span>
              )}
            </div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 2. MAIN CHARTS SECTION */}
      <div style={styles.chartsGrid}>
        {/* Port Congestion Analysis */}
        <div style={styles.chartCard}>
          <div style={styles.cardHeader}>
            <Anchor size={18} /> <h3>Port Congestion Analysis</h3>
          </div>
          <div style={styles.placeholderChart}>
             {/* Replace with <BarChart /> component */}
             <div style={{textAlign: 'center', color: '#94a3b8'}}>
               [Bar Chart: Singapore vs. Rotterdam vs. Jebel Ali Wait Times]
               <div style={styles.dummyBarContainer}>
                  <div style={{...styles.dummyBar, height: '60%', background: '#0ea5e9'}}></div>
                  <div style={{...styles.dummyBar, height: '40%', background: '#6366f1'}}></div>
                  <div style={{...styles.dummyBar, height: '80%', background: '#38bdf8'}}></div>
               </div>
             </div>
          </div>
        </div>

        {/* Vessel Distribution */}
        <div style={styles.chartCard}>
          <div style={styles.cardHeader}>
            <BarChart3 size={18} /> <h3>Fleet Distribution</h3>
          </div>
          <div style={styles.placeholderChart}>
             {/* Replace with <PieChart /> component */}
             <div style={{textAlign: 'center', color: '#94a3b8'}}>
                [Pie Chart: 60% Cargo | 40% Tanker]
                <div style={styles.dummyPie}></div>
             </div>
          </div>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY TABLE */}
      <div style={styles.tableCard}>
        <h3 style={{marginBottom: '15px', fontSize: '16px'}}>Subscription Alert History</h3>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Entity Name</th>
              <th style={styles.th}>Event Type</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}>Ocean Voyager 102</td>
              <td style={styles.td}>Berthing Confirmed</td>
              <td style={styles.td}>14:20 PM</td>
              <td style={styles.td}><span style={styles.statusBadge}>Logged</span></td>
            </tr>
            <tr>
              <td style={styles.td}>Port of Singapore</td>
              <td style={styles.td}>High Congestion Alert</td>
              <td style={styles.td}>12:05 PM</td>
              <td style={styles.td}><span style={styles.statusBadge}>Notified</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '25px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  statCard: { background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  statHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  statValue: { fontSize: '24px', fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: '13px', color: '#64748b', marginTop: '4px' },
  chartsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  chartCard: { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#1e293b' },
  placeholderChart: { height: '220px', background: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #cbd5e1' },
  dummyBarContainer: { display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px', marginTop: '15px' },
  dummyBar: { width: '30px', borderRadius: '4px 4px 0 0' },
  dummyPie: { width: '80px', height: '80px', borderRadius: '50%', border: '15px solid #0ea5e9', borderRightColor: '#6366f1', marginTop: '15px' },
  tableCard: { background: 'white', padding: '25px', borderRadius: '15px', border: '1px solid #e2e8f0' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeaderRow: { textAlign: 'left', borderBottom: '2px solid #f1f5f9' },
  th: { padding: '12px', color: '#64748b', fontSize: '13px', fontWeight: '600' },
  td: { padding: '15px 12px', fontSize: '14px', borderBottom: '1px solid #f1f5f9', color: '#475569' },
  statusBadge: { padding: '4px 8px', background: '#f1f5f9', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }
};

export default Analysis;