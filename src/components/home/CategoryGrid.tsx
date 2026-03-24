'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './CategoryGrid.module.css';

const categories = [
  { name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=687&auto=format&fit=crop' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?q=80&w=687&auto=format&fit=crop' },
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop' },
  { name: 'Bridal Sets', slug: 'bridal', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1170&auto=format&fit=crop' },
];

const CategoryGrid = () => {
  return (
    <section className={`container ${styles.categorySection}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        <h2>Shop By Category</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className={styles.grid}>
        {categories.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className={`${styles.categoryCard} ${index === 0 ? styles.large : ''}`}
          >
            <Link href={`/categories/${cat.slug}`}>
              <div className={styles.imageOverlay}></div>
              <Image 
                src={cat.image} 
                alt={cat.name} 
                fill
                className={styles.bgImage}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className={styles.label}>
                <h3>{cat.name}</h3>
                <span>Explore Now</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
