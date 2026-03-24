'use client';

import React from 'react';
import styles from './InfoTicker.module.css';

const tickerItems = [
  "7 DAYS EASY RETURN/EXCHANGE",
  "1 YEARS WARRANTY",
  "18KT GOLD VERMEIL ON 925 STERLING SILVER",
  "HALLMARKED JEWELLERY",
  "FREE SHIPPING ON ORDERS ABOVE 1990",
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
