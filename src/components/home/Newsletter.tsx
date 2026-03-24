'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className={styles.newsletterSection}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`container ${styles.newsletterContainer}`}
      >
        <div className={styles.content}>
          <h2>Join Our <span className="text-gold">Inner Circle</span></h2>
          <p>Get exclusive early access to new collections, special offers, and jewellery styling tips.</p>
        </div>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit" className="btn-premium">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;
