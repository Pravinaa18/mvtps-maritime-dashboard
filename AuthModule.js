import React, { useState } from 'react';
import { Ship, Lock, Mail, UserCircle } from 'lucide-react';
import { COLORS, SHARED_STYLES } from './ThemeConfig';

const AuthModule = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('Operator');
  const [email, setEmail] = useState('Pravinaa@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'Pravinaa@gmail.com' && password === '123456') {
      onLoginSuccess({ username: 'Pravinaa', email, role });
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ ...SHARED_STYLES.card, width: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Ship size={50} color={COLORS.seaBlue} />
          <h2 style={{ color: COLORS.navy, marginTop: '10px' }}>MVTPS Login</h2>
        </div>

        <div style={styles.roleSelector}>
          {['Operator', 'Analyst', 'Admin'].map((r) => (
            <button 
              key={r}
              onClick={() => setRole(r)}
              style={{
                ...styles.roleBtn,
                backgroundColor: role === r ? COLORS.seaBlue : 'transparent',
                color: role === r ? 'white' : COLORS.textGrey
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <Mail size={18} color={COLORS.textGrey} />
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <Lock size={18} color={COLORS.textGrey} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.loginBtn}>Login as {role}</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: COLORS.navy },
  roleSelector: { display: 'flex', gap: '5px', marginBottom: '20px', background: '#f0f0f0', padding: '5px', borderRadius: '8px' },
  roleBtn: { flex: 1, border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '10px', border: `1px solid ${COLORS.lightGrey}`, padding: '10px', borderRadius: '8px', marginBottom: '15px' },
  input: { border: 'none', outline: 'none', width: '100%' },
  loginBtn: { width: '100%', padding: '12px', background: COLORS.seaBlue, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default AuthModule;