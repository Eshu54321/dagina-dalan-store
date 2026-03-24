'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './CollectionGrid.module.css';

const CollectionGrid = () => {
  return (
    <section className={styles.collectionSection}>
      <div className="container">
        <div className="section-title">
          <h2>Our Signature Collections</h2>
          <div className="underline"></div>
        </div>

        <div className={styles.grid}>
          {/* Featured Large Collection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.largeFeatured}
          >
            <div className={styles.imageOverlay}></div>
            <Image 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop" 
              alt="Cleopatra Glam" 
              fill 
              className={styles.bgImage}
              sizes="(max-width: 992px) 100vw, 1200px"
            />
            <div className={styles.contentBox}>
              <span className={styles.tag}>Collection | </span>
              <h3>Cleopatra Glam</h3>
              <p>Introducing our new mesmerizing jewelry collection. Embrace your inner allure with the timeless elegance and radiant beauty of ancient Egypt.</p>
              <Link href="/shop" className="btn-premium">Shop Now</Link>
            </div>
          </motion.div>

          {/* Smaller Collections Grid */}
          <div className={styles.smallGrid}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.smallBox}
            >
              <div className={styles.boxText}>
                <h3>Luxe Abundance</h3>
                <Link href="/shop" className={styles.link}>View Products →</Link>
              </div>
              <div className={styles.boxImage}>
                <Image 
                  src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=400&auto=format&fit=crop" 
                  alt="Luxe Abundance" 
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={styles.smallBox}
            >
              <div className={styles.boxText}>
                <h3>Sparkle in Love</h3>
                <p>Make her say yes with our 50% off rings.</p>
                <Link href="/shop" className={styles.link}>View Products →</Link>
              </div>
              <div className={styles.boxImage}>
                <Image 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop" 
                  alt="Sparkle in Love" 
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
