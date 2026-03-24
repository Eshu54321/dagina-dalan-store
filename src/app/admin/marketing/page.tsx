'use client';

import React from 'react';
import { Megaphone, MessageSquare, Mail, Bell, Send, Users } from 'lucide-react';

const campaigns = [
  { id: 'CMP-001', name: 'Akshaya Tritiya Early Access', channel: 'WhatsApp', status: 'Scheduled', reach: '1,200', date: '28 Apr 2026' },
  { id: 'CMP-002', name: 'Abandoned Cart Recovery', channel: 'Email', status: 'Active', reach: 'Auto', date: 'Ongoing' },
  { id: 'CMP-003', name: 'New Collection Launch', channel: 'Push', status: 'Completed', reach: '4,500', date: '15 Mar 2026' },
];

export default function MarketingPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Marketing Command</h1>
        <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Megaphone size={18} />
          <span>New Campaign</span>
        </button>
      </div>

      <div className="grid grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px' }}>
          <div style={{ padding: '15px', background: 'rgba(37, 211, 102, 0.1)', borderRadius: '50%', color: '#25D366', marginBottom: '16px' }}>
            <MessageSquare size={32} />
          </div>
          <h3 style={{ marginBottom: '8px' }}>WhatsApp Broadcast</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Send direct messages to your premium customers.</p>
          <button style={{ width: '100%', padding: '10px', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Configure</button>
        </div>

        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px' }}>
          <div style={{ padding: '15px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: '#3B82F6', marginBottom: '16px' }}>
            <Mail size={32} />
          </div>
          <h3 style={{ marginBottom: '8px' }}>Email Marketing</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Design beautiful newsletters and recovery emails.</p>
          <button style={{ width: '100%', padding: '10px', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Manage Lists</button>
        </div>

        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '30px' }}>
          <div style={{ padding: '15px', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '50%', color: 'var(--admin-gold)', marginBottom: '16px' }}>
            <Bell size={32} />
          </div>
          <h3 style={{ marginBottom: '8px' }}>Web Push</h3>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Notify browsers about flash sales instantly.</p>
          <button style={{ width: '100%', padding: '10px', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>Draft Notification</button>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Recent Campaigns</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
              <th style={{ padding: '12px' }}>Campaign Name</th>
              <th style={{ padding: '12px' }}>Channel</th>
              <th style={{ padding: '12px' }}>Date</th>
              <th style={{ padding: '12px' }}>Estimated Reach</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((camp) => (
              <tr key={camp.id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600' }}>{camp.name}</td>
                <td style={{ padding: '16px 12px' }}>{camp.channel}</td>
                <td style={{ padding: '16px 12px' }}>{camp.date}</td>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={14} color="var(--admin-text-muted)" />
                    {camp.reach}
                  </div>
                </td>
                <td style={{ padding: '16px 12px' }}>
                  <span style={{ 
                    padding: '4px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.75rem', 
                    fontWeight: '700',
                    background: camp.status === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 
                                camp.status === 'Scheduled' ? 'rgba(59, 130, 246, 0.1)' :
                                'rgba(255, 255, 255, 0.05)',
                    color: camp.status === 'Active' ? '#10B981' : 
                           camp.status === 'Scheduled' ? '#3B82F6' :
                           'var(--admin-text-muted)'
                  }}>
                    {camp.status}
                  </span>
                </td>
                <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--admin-gold)', cursor: 'pointer' }}>
                    <Send size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
