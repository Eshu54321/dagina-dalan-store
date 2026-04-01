'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const sliderSlides = [
  {
    desktop: '/hero-1-desktop.png',
    mobile: '/hero-1-mobile.png',
    title: '1 Gram Gold Mangalsutras',
    subTitle: 'Premium 1 gram gold heritage reimagined with ',
    author: 'Amrita Rao'
  },
  {
    desktop: '/hero-2-desktop.png',
    mobile: '/hero-2-mobile.png',
    title: 'Heritage Bridal Sets',
    subTitle: 'Exquisite imitation bridal sets for your ',
    author: 'Special Day'
  },
  {
    desktop: '/hero-3-desktop.png',
    mobile: '/hero-3-mobile.png',
    title: 'Minimalist Essentials',
    subTitle: 'Premium 1 gram gold daily wear for ',
    author: 'Everyday'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
    }, 6000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, []);

  const slide = sliderSlides[currentSlide];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderSlides.length) % sliderSlides.length);

  return (
    <section className={styles.hero}>
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.splitLayout}
        >
          {/* Content Side */}
          <div className={styles.contentCol}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={styles.textContent}
            >
              <h1 className={styles.serif}>{slide.title}</h1>
              <p className={styles.subText}>
                {slide.subTitle} <span className={styles.italic}>{slide.author}</span>
              </p>
              <Link href="/shop" className={styles.shopNow}>
                SHOP NOW
              </Link>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className={styles.imageCol}>
            <Image
              src={isMobile ? slide.mobile : slide.desktop}
              alt={slide.title}
              fill
              priority
              className={styles.heroImg}
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide} aria-label="Previous">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide} aria-label="Next">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>

      {/* Pagination */}
      <div className={styles.pagination}>
        {sliderSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`${styles.dot} ${currentSlide === idx ? styles.activeDot : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
