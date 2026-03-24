'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Auth.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      // Fetch fresh session to check role
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (['admin', 'editor', 'viewer'].includes(role)) {
        router.push('/admin/products');
      } else {
        router.push('/profile');
      }
      
      // Full reload to ensure layout/navbar updates
      setTimeout(() => window.location.reload(), 100);
    }
  };

  return (
    <div className={styles.authWrapper} suppressHydrationWarning>
      <div className={styles.authCard} suppressHydrationWarning>
        <h2>Welcome Back</h2>
        <p>Login to your Dagina Dalan account</p>
        
        {error && <p className={styles.error}>{error}</p>}
        
        <form onSubmit={handleSubmit} suppressHydrationWarning>
          <div className={styles.inputGroup} suppressHydrationWarning>
            <label>Email Address</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="example@mail.com" required 
            />
          </div>
          <div className={styles.inputGroup} suppressHydrationWarning>
            <label>Password</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" required 
            />
          </div>
          <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '10px' }}>
            Login
          </button>
        </form>
        
        <p className={styles.footerText}>
          Don't have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
