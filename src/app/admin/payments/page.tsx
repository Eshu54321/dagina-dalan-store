'use client';

import React from 'react';
import { CreditCard, Download, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const transactions = [
  { id: 'PAY-9901', order: 'ORD-7721', amount: '₹4,500', method: 'UPI (PhonePe)', status: 'Success', date: '23 Mar 2026' },
  { id: 'PAY-9900', order: 'ORD-7720', amount: '₹12,200', method: 'Card (Visa)', status: 'Success', date: '22 Mar 2026' },
  { id: 'PAY-9899', order: 'ORD-7719', amount: '₹8,900', method: 'UPI (GPay)', status: 'Failed', date: '22 Mar 2026' },
  { id: 'PAY-9898', order: 'ORD-7718', amount: '₹15,400', method: 'Netbanking', status: 'Success', date: '21 Mar 2026' },
];

export default function PaymentsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 className="admin-title" style={{ margin: 0 }}>Transaction Logs</h1>
        <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} />
          <span>Export payout report</span>
        </button>
      </div>

      <div className="grid grid-3" style={{ gap: '24px', marginBottom: '40px' }}>
        <div className="admin-card">
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Next Payout</p>
          <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>₹2,45,800</h2>
          <p style={{ fontSize: '0.8rem', color: '#10B981' }}>Scheduled for 25th Mar</p>
        </div>
        <div className="admin-card">
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Failed Payments</p>
          <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>₹8,900</h2>
          <p style={{ fontSize: '0.8rem', color: '#EF4444' }}>1 Transaction needs attention</p>
        </div>
        <div className="admin-card">
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>Refunds Processed</p>
          <h2 style={{ fontSize: '1.8rem', margin: '10px 0' }}>₹12,000</h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>This month</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '20px', fontWeight: '600' }}>Recent Transactions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
              <th style={{ padding: '12px' }}>TXN ID</th>
              <th style={{ padding: '12px' }}>Order ID</th>
              <th style={{ padding: '12px' }}>Amount</th>
              <th style={{ padding: '12px' }}>Method</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                <td style={{ padding: '16px 12px', fontWeight: '600' }}>{txn.id}</td>
                <td style={{ padding: '16px 12px' }}>{txn.order}</td>
                <td style={{ padding: '16px 12px' }}>{txn.amount}</td>
                <td style={{ padding: '16px 12px' }}>{txn.method}</td>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {txn.status === 'Success' ? <CheckCircle2 size={16} color="#10B981" /> : (txn.status === 'Failed' ? <AlertCircle size={16} color="#EF4444" /> : <Clock size={16} color="#EAB308" />)}
                    <span style={{ color: txn.status === 'Success' ? '#10B981' : (txn.status === 'Failed' ? '#EF4444' : '#EAB308') }}>{txn.status}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 12px' }}>{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
