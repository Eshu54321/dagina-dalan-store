'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './CollectionSlider.module.css';

const collections = [
  { name: 'Charms', slug: 'charms', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' },
  { name: 'Necklaces', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop' },
  { name: 'Bracelets', slug: 'bracelets', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=400&auto=format&fit=crop' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1535639818669-c059d2f038e6?q=80&w=400&auto=format&fit=crop' },
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
];

const CollectionSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.sliderSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>A <span className="text-gold">LOVE</span> BY LUXE</h2>
          <div className={styles.sliderControls}>
            <button onClick={() => scroll('left')} className={styles.sliderArrow}><ChevronLeft size={20} /></button>
            <button onClick={() => scroll('right')} className={styles.sliderArrow}><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className={styles.sliderWrapper} ref={scrollRef}>
          {collections.map((item, index) => (
            <motion.div 
              key={item.slug}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/categories/${item.slug}`}>
                <div className={styles.imageContainer}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className={styles.image}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className={styles.labelWrapper}>
                    <span className={styles.pillLabel}>{item.name}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionSlider;
