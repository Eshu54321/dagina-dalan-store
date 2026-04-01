'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import styles from './CategorySection.module.css';

interface CategorySectionProps {
  title: string;
  products: any[];
  viewAllLink: string;
}

const CategorySection = ({ title, products, viewAllLink }: CategorySectionProps) => {
  return (
    <section className={styles.categorySection}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`section-title ${styles.titleContainer}`}
        >
          <h2>{title}</h2>
          <div className="underline"></div>
        </motion.div>
        
        <div className="grid grid-4">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={styles.viewAllContainer}
        >
          <Link href={viewAllLink} className={styles.viewAllBtn}>
            View All {title}
            <ArrowRight size={18} className={styles.arrow} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
