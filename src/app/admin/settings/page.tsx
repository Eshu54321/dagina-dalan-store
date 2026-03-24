'use client';

import React from 'react';
import { Settings, Image as ImageIcon, CreditCard, Truck, Gavel, Globe, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Global Settings</h1>
        <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-2" style={{ gap: '24px' }}>
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <ImageIcon size={20} color="var(--admin-gold)" />
            <h3 style={{ fontWeight: '600' }}>Branding & Identity</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>Store Name</label>
              <input type="text" defaultValue="Dagina Dalan" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>Admin Logo</label>
              <div style={{ padding: '20px', border: '2px dashed var(--admin-border)', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Drag logo here or click to upload</p>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <CreditCard size={20} color="var(--admin-gold)" />
            <h3 style={{ fontWeight: '600' }}>Payment Gateway</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '12px', background: 'rgba(201, 162, 39, 0.05)', borderRadius: '6px', border: '1px solid var(--admin-gold)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Razorpay Integration</span>
              <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 'bold' }}>CONNECTED</span>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>Key ID</label>
              <input type="password" value="rzp_live_xxxxxxxxxxxxxx" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Gavel size={20} color="var(--admin-gold)" />
            <h3 style={{ fontWeight: '600' }}>Taxation (GST)</h3>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>GSTIN Number</label>
              <input type="text" placeholder="27XXXXX0000X1Z5" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
            </div>
            <div style={{ width: '100px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '8px' }}>Rate (%)</label>
              <input type="number" defaultValue="3" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <Globe size={20} color="var(--admin-gold)" />
            <h3 style={{ fontWeight: '600' }}>Social Media Links</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" placeholder="Instagram URL" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
            <input type="text" placeholder="Facebook URL" style={{ width: '100%', padding: '10px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '6px', color: 'white' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
