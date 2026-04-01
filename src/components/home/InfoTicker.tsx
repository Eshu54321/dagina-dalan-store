'use client';

import React from 'react';
import styles from './InfoTicker.module.css';

const tickerItems = [
  "✔ Premium 1 Gram Gold Plating",
  "✔ Skin-Friendly Material",
  "✔ Anti-Tarnish Coating",
  "✔ Lightweight & Comfortable",
  "✔ 100% Quality Assurance",
];

const InfoTicker = () => {
  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerTrack}>
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className={styles.tickerItem}>
            <span>{item}</span>
            <span className={styles.dot}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoTicker;
