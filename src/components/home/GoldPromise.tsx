'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle, Shield, RefreshCcw, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './GoldPromise.module.css';

const promises = [
  {
    icon: <CheckCircle size={32} />,
    title: 'Tested and certified',
    description: 'Every piece: tested, certified, and guaranteed for genuine excellence.'
  },
  {
    icon: <Shield size={32} />,
    title: 'Complete transparency',
    description: 'Discover authenticity at every facet with our complete transparency.'
  },
  {
    icon: <RefreshCcw size={32} />,
    title: 'Guaranteed buy back',
    description: 'Ensuring your jewelry retains value & flexibility for future exchanges.'
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Flexible payment options',
    description: 'Making your dream adornments more accessible than ever.'
  }
];

const GoldPromise = () => {
  return (
    <section className={styles.promiseSection}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.imageCol}>
          <Image 
            src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop" 
            alt="Customer Promise" 
            fill
            className={styles.promiseImg}
            sizes="(max-width: 992px) 100vw, 500px"
          />
        </div>
        <div className={styles.contentCol}>
          <div className={styles.header}>
            <span className={styles.subtitle}>Our Promise</span>
            <h2 className={styles.title}>Our Gold Promise</h2>
          </div>
          <div className={styles.promiseList}>
            {promises.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={styles.promiseItem}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                <div className={styles.text}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoldPromise;
