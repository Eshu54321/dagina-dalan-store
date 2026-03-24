'use client';

import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Mail, MessageSquare, Star } from 'lucide-react';

const segmentColors: any = {
  'VIP': { bg: 'rgba(201, 162, 39, 0.15)', text: 'var(--admin-gold)' },
  'Repeat': { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
  'New': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/admin/customers');
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const getSegment = (orders: number, spent: number) => {
    if (orders >= 10 || spent > 50000) return 'VIP';
    if (orders >= 2) return 'Repeat';
    return 'New';
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Loading Customers...</div>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Customer Relations</h1>
        <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={18} />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 40px', 
                background: 'var(--admin-bg)', 
                border: '1px solid var(--admin-border)', 
                borderRadius: '6px',
                color: 'white',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px' }}>Customer Info</th>
                <th style={{ padding: '12px' }}>Total Orders</th>
                <th style={{ padding: '12px' }}>Total Spent</th>
                <th style={{ padding: '12px' }}>Segment</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => {
                const segment = getSegment(customer.totalOrders, customer.totalSpent);
                return (
                  <tr key={customer._id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {customer.name}
                        {segment === 'VIP' && <Star size={14} fill="var(--admin-gold)" color="var(--admin-gold)" />}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{customer.email}</div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>{customer.totalOrders} Orders</td>
                    <td style={{ padding: '16px 12px', fontWeight: '500' }}>₹{customer.totalSpent.toLocaleString()}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem', 
                        fontWeight: '700',
                        background: segmentColors[segment]?.bg || 'rgba(255,255,255,0.05)',
                        color: segmentColors[segment]?.text || 'white'
                      }}>
                        {segment}
                      </span>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button title="Email" style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}><Mail size={18} /></button>
                        <button title="WhatsApp" style={{ background: 'none', border: 'none', color: '#25D366', cursor: 'pointer' }}><MessageSquare size={18} /></button>
                        <button title="View Profile" style={{ background: 'none', border: 'none', color: 'var(--admin-gold)', cursor: 'pointer' }}>View</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No customers found in record.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
