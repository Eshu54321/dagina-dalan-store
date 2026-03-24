'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/Auth.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <h2>Join Dagina Dalan</h2>
        <p>Create an account to start your journey</p>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="John Doe" required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="example@mail.com" required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              placeholder="••••••••" required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input 
              type="password" value={formData.confirmPassword} 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              placeholder="••••••••" required 
            />
          </div>
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '10px' }}>
            Register
          </button>
        </form>
        
        <p className={styles.footerText}>
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
