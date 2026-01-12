import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [role, setRole] = useState('operator');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Pravinaa' && password === '123456') {
      onLogin(role);
    } else {
      alert("Invalid credentials. Please use Pravinaa / 123456");
    }
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <h1 style={styles.portalTitle}>MVTPS Portal</h1>
        
        {/* Role Selection Buttons */}
        <div style={styles.roleContainer}>
          {['operator', 'analyst', 'admin'].map((r) => (
            <button 
              key={r}
              onClick={() => setRole(r)}
              style={role === r ? styles.activeRoleBtn : styles.roleBtn}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputWrap}>
            <User size={18} color="#94a3b8"/>
            <input 
              type="text" 
              placeholder="Username" 
              style={styles.input} 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputWrap}>
            <Lock size={18} color="#94a3b8"/>
            <input 
              type="password" 
              placeholder="Password" 
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.loginSubmit}>Login</button>
        </form>

        <p style={styles.signupText}>
          Don't have an account? <span style={styles.link}>Signup</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  loginPage: { height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f172a' },
  loginCard: { width: '400px', padding: '40px', background: 'white', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' },
  portalTitle: { color: '#0f172a', marginBottom: '30px', fontSize: '28px', fontWeight: 'bold' },
  roleContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' },
  roleBtn: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', color: '#64748b' },
  activeRoleBtn: { padding: '8px 12px', borderRadius: '6px', border: 'none', background: '#0ea5e9', color: 'white', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputWrap: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
  input: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  loginSubmit: { padding: '14px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' },
  signupText: { marginTop: '20px', fontSize: '13px', color: '#64748b' },
  link: { color: '#0ea5e9', cursor: 'pointer', fontWeight: 'bold' }
};

export default Login;