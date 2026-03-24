'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, Printer, Truck, CheckCircle } from 'lucide-react';

const statusColors: any = {
  'Processing': { bg: 'rgba(234, 179, 8, 0.1)', text: '#EAB308' },
  'Shipped': { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6' },
  'Delivered': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981' },
  'Cancelled': { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444' },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      fetchOrders();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const filteredOrders = orders.filter(o => 
    o._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Loading orders...</div>;
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Order Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--admin-surface)', color: 'white', border: '1px solid var(--admin-border)' }}>
            <Download size={18} />
            <span>Export CSV</span>
          </button>
          <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Printer size={18} />
            <span>Print Manifest</span>
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Filter by Order ID, Customer or Email..." 
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
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '0 20px', 
            background: 'var(--admin-bg)', 
            border: '1px solid var(--admin-border)', 
            borderRadius: '6px',
            color: 'white'
          }}>
            <Filter size={18} />
            <span>Status</span>
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px' }}>Order Details</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Payment</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ fontWeight: '600' }}>#{order._id.slice(-6).toUpperCase()}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{order.items?.length || 0} Items • ₹{order.totalPrice.toLocaleString()}</div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <div>{order.user?.name || 'Guest'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{order.user?.email || 'N/A'}</div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      color: order.isPaid ? '#10B981' : '#EF4444'
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: order.isPaid ? '#10B981' : '#EF4444' }}></div>
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      background: statusColors[order.status]?.bg || 'rgba(255,255,255,0.05)',
                      color: statusColors[order.status]?.text || 'white'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                      <button title="View Details" style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}><Eye size={18} /></button>
                      <button title="Mark Shipped" onClick={() => updateStatus(order._id, 'Shipped')} style={{ background: 'none', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}><Truck size={18} /></button>
                      <button title="Mark Delivered" onClick={() => updateStatus(order._id, 'Delivered')} style={{ background: 'none', border: 'none', color: 'var(--admin-gold)', cursor: 'pointer' }}><CheckCircle size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No orders found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
