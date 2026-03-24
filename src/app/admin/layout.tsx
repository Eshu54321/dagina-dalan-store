'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Search, Bell, User, Plus, Zap, Menu, X } from 'lucide-react';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={`admin-body ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile Top Header */}
      <div className="mobile-header">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <Menu size={24} color="var(--admin-gold)" />
        </button>
        <div style={{ fontFamily: 'Manrope', fontWeight: '800', fontSize: '1.2rem', color: 'var(--admin-gold)', letterSpacing: '2px' }}>
          DAGINA <span style={{ fontWeight: '400', color: 'white' }}>ADMIN</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Bell size={20} color="var(--admin-text-muted)" />
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--admin-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontSize: '10px', fontWeight: 'bold' }}>
            AD
          </div>
        </div>
      </div>

      <div className="admin-container">
        {/* Overlay for mobile */}
        <div 
          className={`admin-overlay ${isSidebarOpen ? 'visible' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar with responsive container */}
        <div className={`admin-sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
          <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="admin-main">
          {/* Global Admin Header (Desktop) */}
          <header className="admin-desktop-header" style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '40px',
            padding: '0 0 20px 0',
            borderBottom: '1px solid var(--admin-border)'
          }}>
            <div style={{ position: 'relative', width: '400px' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
              <input 
                type="text" 
                placeholder="Global search (Cmd + K)..." 
                style={{ 
                  width: '100%', 
                  padding: '10px 10px 10px 40px', 
                  background: 'var(--admin-surface)', 
                  border: 'none', 
                  borderRadius: '6px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer', position: 'relative' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: 'var(--admin-gold)', width: '8px', height: '8px', borderRadius: '50%' }}></span>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 12px', background: 'var(--admin-surface)', borderRadius: '30px', border: '1px solid var(--admin-border)' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--admin-gold) 0%, #8A6D1A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111', fontWeight: 'bold', fontSize: '10px' }}>
                  AD
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>Admin Portal</span>
              </div>
            </div>
          </header>

          <div className="admin-content">
            {children}
          </div>

          {/* Quick Actions Floating Button */}
          <button style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--admin-gold)',
            color: '#111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(201, 162, 39, 0.4)',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1000
          }}>
            <Zap size={24} fill="#111111" />
          </button>
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .admin-desktop-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
