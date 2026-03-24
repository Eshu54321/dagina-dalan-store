'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CategorySlider.module.css';

const categories = [
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=400&auto=format&fit=crop' },
  { name: 'Gold Coin', slug: 'gold-coins', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Chain', slug: 'chains', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop' },
  { name: 'Necklace Set', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop' },
  { name: 'Nose Pins', slug: 'nose-pins', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' },
];

const CategorySlider = () => {
  return (
    <section className={styles.categorySection}>
      <div className={`container ${styles.sliderContainer}`}>
        {categories.map((cat, index) => (
          <motion.div 
            key={cat.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={styles.categoryItem}
          >
            <Link href={`/categories/${cat.slug}`}>
              <div className={styles.circleWrapper}>
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill
                  className={styles.circleImage}
                  sizes="120px"
                />
              </div>
              <span className={styles.categoryName}>{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySlider;
