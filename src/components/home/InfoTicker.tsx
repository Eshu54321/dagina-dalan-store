'use client';

import React from 'react';
import styles from './InfoTicker.module.css';

const tickerItems = [
  "✔ Premium Finish Jewellery",
  "✔ Skin-Friendly Material",
  "✔ Anti-Tarnish Coating",
  "✔ Lightweight & Comfortable",
  "✔ Trusted Quality Guarantee",
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
