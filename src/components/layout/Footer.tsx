'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer} suppressHydrationWarning>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={`container ${styles.footerGrid}`}
        suppressHydrationWarning
      >
        <div className={styles.brandCol} suppressHydrationWarning>
          <h3>DAGINA <span>DALAN</span></h3>
          <p>Exquisite imitation and 1 gram gold jewellery for your special moments. Crafted with passion, worn with elegance.</p>
          <div className={styles.socials} suppressHydrationWarning>
            <Link href="#"><Facebook size={20} /></Link>
            <Link href="#"><Instagram size={20} /></Link>
            <Link href="#"><Twitter size={20} /></Link>
          </div>
        </div>

        <div className={styles.linkCol} suppressHydrationWarning>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/shop">All Products</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div className={styles.linkCol} suppressHydrationWarning>
          <h4>Policies</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
            <li><Link href="/return-refund">Returns & Refunds</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol} suppressHydrationWarning>
          <h4>Contact Info</h4>
          <p><MapPin size={16} /> Shop no.1, OPP.Radhakrishna hotel,near Union bank of India, Kalyan Bhiwandi road, Kongaon - 421302</p>
          <p><Phone size={16} /> +91 8828203068</p>
          <p><Mail size={16} /> info@daginadalan.com</p>
        </div>
      </motion.div>
      <div className={styles.bottomBar} suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <p>&copy; 2026 Dagina Dalan. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
