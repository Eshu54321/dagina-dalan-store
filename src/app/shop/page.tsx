'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import styles from './Shop.module.css';

import { ChevronDown, Filter } from 'lucide-react';

const ShopPage = () => {
  // Mock products for the shop
  const allProducts = [
    { _id: '1', name: 'The Empress Medallion Necklace', slug: 'the-empress-medallion-necklace', price: 4500, discountPrice: 3800, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'], category: 'Necklaces' },
    { _id: '2', name: 'Gold Plated Jhumkas', slug: 'gold-plated-jhumkas', price: 1200, images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop'], category: 'Earrings' },
    { _id: '3', name: 'Floral Diamond Ring', slug: 'floral-diamond-ring', price: 2500, discountPrice: 2100, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'], category: 'Rings' },
    { _id: '4', name: 'Pearl Bridal Bangle', slug: 'pearl-bridal-bangle', price: 3200, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'], category: 'Bangles' },
    { _id: '5', name: 'Ruby Pendant Set', slug: 'ruby-pendant-set', price: 2800, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop'], category: 'Necklaces' },
    { _id: '6', name: 'Royal Maharani Set', slug: 'royal-maharani-set', price: 8500, discountPrice: 7200, images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop'], category: 'Necklaces' }
  ];

  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className={styles.shopWrapper}>
      {/* BOUTIQUE HEADER */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumbs}>
             <span>Home</span> <span>/</span> <span>Our Collection</span>
          </div>
          <h1 className={styles.name}>The <span className="text-gold">Heritage</span> Room</h1>
          <p>Discover a curated collection of jewellery that celebrates timeless artistry and the royal heritage of India.</p>
        </div>
      </header>

      {/* TOP FILTER BAR */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterGroups}>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}>Category <ChevronDown size={14} /></span>
              </div>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}>Material <ChevronDown size={14} /></span>
              </div>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}>Price <ChevronDown size={14} /></span>
              </div>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}><Filter size={14} /> All Filters</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span className={styles.itemCount}>{allProducts.length} items</span>
              <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                <select 
                  className={styles.sortSelect}
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="newest">Newest</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <main className={`container ${styles.productMain}`}>
        <div className="grid grid-4">
          {allProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
