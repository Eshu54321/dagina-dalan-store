'use client';

import React from 'react';
import { BarChart3, PieChart, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import RevenueChart from '@/components/admin/RevenueChart';

export default function AnalyticsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Business Intelligence</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 16px', 
            background: 'rgba(201, 162, 39, 0.1)', 
            border: '1px solid var(--admin-gold)', 
            borderRadius: '6px',
            color: 'var(--admin-gold)',
            fontSize: '0.85rem'
          }}>
            <Sparkles size={16} />
            <span>AI Insights Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
        <div className="admin-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Cumulative Revenue Growth</h3>
          <RevenueChart />
        </div>
        
        <div className="admin-card">
          <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Sales by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { name: 'Necklaces', value: '45%', color: 'var(--admin-gold)' },
              { name: 'Earrings', value: '30%', color: '#EAB308' },
              { name: 'Rings', value: '15%', color: '#8A6D1A' },
              { name: 'Others', value: '10%', color: '#4D4635' },
            ].map((cat) => (
              <div key={cat.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span>{cat.name}</span>
                  <span style={{ color: 'var(--admin-text-muted)' }}>{cat.value}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--admin-bg)', borderRadius: '10px' }}>
                  <div style={{ width: cat.value, height: '100%', background: cat.color, borderRadius: '10px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ gap: '24px' }}>
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: '600' }}>Top Performing Products</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--admin-gold)' }}>View All</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Empress Medallion Necklace', sales: '84 units', trend: 'up' },
              { name: 'Royal Kundan Jhumkas', sales: '62 units', trend: 'up' },
              { name: 'Temple Work Bangle', sales: '45 units', trend: 'down' },
            ].map((prod) => (
              <div key={prod.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--admin-border)' }}>
                <span style={{ fontSize: '0.9rem' }}>{prod.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{prod.sales}</span>
                  {prod.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card" style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 100%)', border: '1px solid var(--admin-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Sparkles size={20} color="var(--admin-gold)" />
            <h3 style={{ fontWeight: '600', color: 'var(--admin-gold)' }}>AI Business Insights</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <p>"Your **Necklaces** category is seeing a 24% surge in demand. Consider increasing stock for 'Empress' variants."</p>
            <p>"Customer retention for **VIP segments** has improved by 12% since the last WhatsApp broadcast."</p>
            <p style={{ color: 'var(--admin-text-muted)', fontStyle: 'italic', fontSize: '0.8rem', marginTop: '10px' }}>Generated just now based on March data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
