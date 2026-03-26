'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CategorySlider.module.css';

const categories = [
  { name: 'Bangles', slug: 'bangles', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Earrings', slug: 'earrings', image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=400&auto=format&fit=crop' },
  { name: 'Gold Coin', slug: 'gold-coins', image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=400&auto=format&fit=crop' },
  { name: 'Chain', slug: 'chains', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop' },
  { name: 'Necklace Set', slug: 'necklaces', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400&auto=format&fit=crop' },
  { name: 'Nose Pins', slug: 'nose-pins', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=400&auto=format&fit=crop' },
  { name: 'Rings', slug: 'rings', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop' },
];

const CategorySlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let lastTime = 0;
    const speed = 0.5; // pixels per frame

    const scroll = (time: number) => {
      if (!isPaused) {
        if (lastTime !== 0) {
          const delta = time - lastTime;
          scrollContainer.scrollLeft += speed * (delta / 16.67); // Smooth speed even on high Hz screens
          
          // Seamless loop logic: jump from the start of the 2nd set back to the start of the 1st
          const oneThird = scrollContainer.scrollWidth / 3;
          if (scrollContainer.scrollLeft >= oneThird * 2) {
             scrollContainer.scrollLeft = oneThird;
          } else if (scrollContainer.scrollLeft <= 0) {
             scrollContainer.scrollLeft = oneThird;
          }
        }
        lastTime = time;
      } else {
        lastTime = 0; // Reset time so we don't jump when unpausing
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Initial positioning to the middle set for seamless bidirectional loop
    const initialPosition = () => {
       if (scrollContainer.scrollWidth > 0) {
          scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
       } else {
          setTimeout(initialPosition, 100);
       }
    };
    initialPosition();

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <section className={styles.categorySection}>
      <div 
        ref={scrollRef}
        className={styles.sliderContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {[...categories, ...categories, ...categories].map((cat, index) => (
          <div 
            key={`${cat.slug}-${index}`}
            className={styles.categoryItem}
          >
            <Link href={`/categories/${cat.slug}`}>
              <div className={styles.circleWrapper}>
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill
                  className={styles.circleImage}
                  sizes="120px"
                />
              </div>
              <span className={styles.categoryName}>{cat.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySlider;
