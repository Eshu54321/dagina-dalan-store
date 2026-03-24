'use client';

import React from 'react';
import { Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Image from 'next/image';
import { useLazyTable } from '@/hooks/useLazyTable';
import RoleGuard from '@/components/admin/RoleGuard';

export default function ProductsPage() {
  const { 
    data: products, 
    total, 
    loading, 
    search, 
    setSearch, 
    loadMore, 
    hasMore, 
    refresh,
    error 
  } = useLazyTable<any>({ apiEndpoint: '/api/admin/products', initialLimit: 8 });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        refresh();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="products-container">
      <div className="page-header">
        <h1 className="admin-title">Catalogue Management</h1>
        <RoleGuard allowedRoles={['admin', 'editor']}>
          <button className="gold-gradient-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} />
            <span>Add Product</span>
          </button>
        </RoleGuard>
      </div>

      <div className="admin-card controls-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div className="controls-flex">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search by name, SKU or category..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <button className="filter-btn">
            <Filter size={18} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '12px' }}>Product</th>
                <th style={{ padding: '12px' }}>SKU</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Price</th>
                <th style={{ padding: '12px' }}>Stock</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid var(--admin-border)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                        <Image src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <span style={{ fontWeight: '500' }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px', color: 'var(--admin-text-muted)' }}>{product.sku || 'N/A'}</td>
                  <td style={{ padding: '16px 12px' }}>{product.category}</td>
                  <td style={{ padding: '16px 12px' }}>₹{product.price.toLocaleString()}</td>
                  <td style={{ padding: '16px 12px' }}>{product.stock} pcs</td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      background: product.stock > 10 ? 'rgba(16, 185, 129, 0.1)' : 
                                  product.stock > 0 ? 'rgba(234, 179, 8, 0.1)' :
                                  'rgba(239, 68, 68, 0.1)',
                      color: product.stock > 10 ? '#10B981' : 
                             product.stock > 0 ? '#EAB308' :
                             '#EF4444'
                    }}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="icon-btn"><Eye size={18} /></button>
                      <RoleGuard allowedRoles={['admin', 'editor']}>
                        <button className="icon-btn"><Edit size={18} /></button>
                      </RoleGuard>
                      <RoleGuard allowedRoles={['admin']}>
                        <button className="icon-btn" style={{ color: '#FF5555' }} onClick={() => handleDelete(product._id)}>
                          <Trash2 size={18} />
                        </button>
                      </RoleGuard>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-gold)' }}>
              Syncing more products...
            </div>
          )}

          {hasMore && !loading && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button 
                onClick={loadMore}
                className="btn-premium"
                style={{ background: 'transparent', border: '1px solid var(--admin-gold)', color: 'var(--admin-gold)', padding: '8px 24px', fontSize: '0.8rem' }}
              >
                Load More
              </button>
            </div>
          )}

          {!hasMore && products.length > 0 && !loading && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-text-muted)', fontSize: '0.8rem' }}>
              All {total} products loaded.
            </div>
          )}

          {products.length === 0 && !loading && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
              No products found in catalogue.
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .controls-flex {
          display: flex;
          gap: 16px;
        }
        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          background: var(--admin-bg);
          border: 1px solid var(--admin-border);
          borderRadius: 6px;
          color: white;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          .controls-flex {
            flex-direction: column;
          }
          .filter-btn {
            padding: 12px;
            justify-content: center;
          }
        }
        .icon-btn {
          background: none;
          border: none;
          color: var(--admin-text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--admin-gold);
        }
      `}</style>
    </div>
  );
}
