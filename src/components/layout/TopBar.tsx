'use client';

import React from 'react';
import { Phone, Mail, Search, Globe, Instagram, Facebook, X } from 'lucide-react';
import styles from './TopBar.module.css';

const TopBar = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.topBar} suppressHydrationWarning>
      <div className={`container ${styles.container}`} suppressHydrationWarning>
        <p className={styles.announcement} suppressHydrationWarning>
          Free shipping on orders over Rs. 1,990.00 !
        </p>
        <button className={styles.closeBtn} onClick={() => setIsVisible(false)} suppressHydrationWarning>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
