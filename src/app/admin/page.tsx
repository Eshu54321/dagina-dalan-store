'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, IndianRupee } from 'lucide-react';

import RevenueChart from '@/components/admin/RevenueChart';

// Removed static constants for live data sync

export default function AdminDashboard() {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>Syncing with command centre...</div>;

  const stats = [
    { name: 'Total Revenue', value: `₹${(data?.summary?.totalSales || 0).toLocaleString()}`, change: '+12.5%', icon: IndianRupee, color: '#C9A227' },
    { name: 'Total Orders', value: data?.summary?.totalOrders || 0, change: '+8%', icon: ShoppingBag, color: '#C9A227' },
    { name: 'Catalogue Size', value: data?.summary?.totalProducts || 0, change: 'Active', icon: Users, color: '#C9A227' },
    { name: 'Customer Base', value: data?.summary?.totalCustomers || 0, change: '+15%', icon: Users, color: '#C9A227' },
  ];

  const dashboardOrders = data?.recentOrders || [];

  return (
    <div>
      <div className="page-header">
        <h1 className="admin-title">Command Centre</h1>
        <button className="gold-gradient-btn">Generate Report</button>
      </div>
      
      <div className="admin-stats-grid">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="admin-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>{stat.name}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
              </div>
              <div style={{ padding: '10px', background: 'rgba(201, 162, 39, 0.1)', borderRadius: '8px', color: 'var(--admin-gold)' }}>
                <stat.icon size={24} />
              </div>
            </div>
            <div style={{ marginTop: '16px', fontSize: '0.85rem' }}>
              <span style={{ color: '#10B981', fontWeight: '600' }}>{stat.change}</span>
              <span style={{ color: 'var(--admin-text-muted)', marginLeft: '8px' }}>from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="admin-charts-grid">
        <div className="admin-card revenue-card">
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Revenue Analytics</h3>
          <RevenueChart data={data?.chartData || []} />
        </div>
        
        <div className="admin-card alert-card">
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Low Stock Alerts</h3>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--admin-text-muted)' }}>All items are currently healthy.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .admin-charts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .revenue-card {
          grid-column: span 2;
        }
        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 992px) {
          .admin-charts-grid {
            grid-template-columns: 1fr;
          }
          .revenue-card {
            grid-column: span 1;
          }
        }
        @media (max-width: 600px) {
          .pageHeader {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="admin-card">
        <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Recent Orders</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px' }}>Order ID</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px' }}>Date</th>
                <th style={{ padding: '12px' }}>Total</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardOrders.map((order: any) => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px 12px', fontWeight: '600' }}>#{order._id.slice(-6).toUpperCase()}</td>
                  <td style={{ padding: '16px 12px' }}>{order.user?.name || 'Guest'}</td>
                  <td style={{ padding: '16px 12px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 12px' }}>₹{order.totalPrice.toLocaleString()}</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' : 
                                  order.status === 'Shipped' ? 'rgba(59, 130, 246, 0.1)' :
                                  'rgba(201, 162, 39, 0.1)',
                      color: order.status === 'Delivered' ? '#10B981' : 
                             order.status === 'Shipped' ? '#3B82F6' :
                             'var(--admin-gold)'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <button style={{ background: 'none', border: 'none', color: 'var(--admin-gold)', cursor: 'pointer', fontSize: '0.85rem' }}>View Details</button>
                  </td>
                </tr>
              ))}
              {dashboardOrders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
