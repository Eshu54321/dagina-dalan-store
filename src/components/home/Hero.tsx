'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <Image 
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1920&auto=format&fit=crop" 
          alt="Premium Dazzles Heritage Jewellery" 
          fill 
          priority
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={styles.textContent}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Timeless <span className={styles.italic}>Artistry</span>, <br /> Crafted for <span className="text-gold">Heritage</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover our curated collection of fine jewellery, where every piece tells a story of tradition and exquisite craftsmanship.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className={styles.cta}
          >
            <Link href="/shop" className="btn-premium">Shop Now <span className={styles.arrow}>→</span></Link>
            <Link href="/categories/all" className={styles.secondaryBtn}>Explore Collection</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
