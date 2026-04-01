import React from 'react';
import Image from 'next/image';
import styles from './About.module.css';

const AboutPage = () => {
  return (
    <div className={`storefront-main ${styles.aboutWrapper}`}>
      <header className={styles.header}>
        <div className="container">
          <h1>Our Story</h1>
          <div className="underline"></div>
        </div>
      </header>

      <section className={`container ${styles.section}`}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2>The Legacy of 1 Gram Gold</h2>
            <p>
              Dagina Dalan was born out of a passion for exquisite design and the belief that luxury should be accessible to everyone. We specialize in **Premium Imitation and 1 Gram Gold Jewellery** that captures the essence of traditional craftsmanship with a modern aesthetic.
            </p>
            <p>
              Each piece in our collection is meticulously handcrafted by skilled artisans who use advanced 1 gram gold plating technology, ensuring a finish that is indistinguishable from solid gold while offering superior durability and radiance.
            </p>
          </div>
          <div className={styles.imageBox}>
             <Image 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1170&auto=format&fit=crop" 
              alt="Our Workshop" 
              fill
              className={styles.img}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <div className={styles.valueGrid}>
            <div className={styles.valueCard} style={{ background: 'white' }}>
              <h3>1 Gram Gold Finish</h3>
              <p>We use premium 1 gram gold plating and high-grade stones to ensure your jewellery stays radiant for years.</p>
            </div>
            <div className={styles.valueCard} style={{ background: 'white' }}>
              <h3>Handcrafted Imitation</h3>
              <p>Supporting local craftsmanship by employing skilled artisans for every intricate imitation design.</p>
            </div>
            <div className={styles.valueCard} style={{ background: 'white' }}>
              <h3>Skin-Safe Luxury</h3>
              <p>All our materials are nickel-free and anti-tarnish for high-end comfort and longevity.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
