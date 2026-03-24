'use client';

import React, { useState, use } from 'react';
import ProductCard from '@/components/product/ProductCard';
import styles from './CategoryPage.module.css';

import { ChevronDown, Filter } from 'lucide-react';

const CategoryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';
  
  // Mock products for the category
  const mockProducts = [
    { _id: '1', name: `Royal ${categoryName} Collection`, slug: `${slug}-special-1`, price: 4500, discountPrice: 3800, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=687&auto=format&fit=crop'], category: categoryName },
    { _id: '2', name: `${categoryName} Heritage Piece`, slug: `${slug}-special-2`, price: 1200, images: ['https://images.unsplash.com/photo-1535639818669-c059d2f038e6?q=80&w=687&auto=format&fit=crop'], category: categoryName },
    { _id: '3', name: `Ethereal ${categoryName}`, slug: `${slug}-special-3`, price: 2500, discountPrice: 2100, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1170&auto=format&fit=crop'], category: categoryName },
    { _id: '4', name: `Majestic ${categoryName}`, slug: `${slug}-special-4`, price: 3200, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop'], category: categoryName },
  ];

  const [sortBy, setSortBy] = useState('newest');

  return (
    <div className={styles.pageWrapper}>
      {/* BOUTIQUE HEADER */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.breadcrumbs}>
             <span>Home</span> <span>/</span> <span>Jewellery</span> <span>/</span> <span>{categoryName}</span>
          </div>
          <h1>{categoryName}</h1>
          <p>Explore our exquisite handcrafted {slug} that bring the royal heritage of India to your modern wardrobe.</p>
        </div>
      </header>
      
      {/* TOP FILTER BAR */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterGroups}>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}>Material <ChevronDown size={14} /></span>
              </div>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}>Price <ChevronDown size={14} /></span>
              </div>
              <div className={styles.filterItem}>
                 <span className={styles.filterLabel}><Filter size={14} /> Filters</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span className={styles.itemCount}>{mockProducts.length} items</span>
              <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                <select 
                  className={styles.sortSelect}
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sort by: Newest</option>
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
          {mockProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
