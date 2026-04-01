'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import styles from './BestSellers.module.css';

const mockProducts = [
  {
    _id: '1',
    name: 'Kundan Necklace Set',
    slug: 'kundan-necklace-set',
    price: 4500,
    discountPrice: 3800,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'],
    category: 'Necklaces'
  },
  {
    _id: '2',
    name: 'Gold Plated Jhumkas',
    slug: 'gold-plated-jhumkas',
    price: 1600,
    discountPrice: 1200,
    images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop'],
    category: 'Earrings'
  },
  {
    _id: '3',
    name: 'Floral Diamond Ring',
    slug: 'floral-diamond-ring',
    price: 2500,
    discountPrice: 2100,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'],
    category: 'Rings'
  },
  {
    _id: '4',
    name: 'Pearl Bridal Bangle',
    slug: 'pearl-bridal-bangle',
    price: 3800,
    discountPrice: 3200,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop'],
    category: 'Bangles'
  }
];

const BestSellers = () => {
  return (
    <section className={`container ${styles.bestSellers}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="section-title"
      >
        <h2>Our Masterpieces</h2>
        <div className="underline"></div>
      </motion.div>
      
      <div className="grid grid-4">
        {mockProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
