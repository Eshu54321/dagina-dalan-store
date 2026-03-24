'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import { ShoppingBag, Heart, Share2, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './ProductDetail.module.css';
import ProductCard from '@/components/product/ProductCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.accordionContent}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [selectedSize, setSelectedSize] = useState('one-size');
  const [showSticky, setShowSticky] = useState(false);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const purchaseRef = React.useRef<HTMLDivElement>(null);
  const relatedGridRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show sticky footer if the main buttons are NOT in view
        // AND the user has scrolled far enough down (using a small buffer or checking bounding rect)
        const isPastButtons = entry.boundingClientRect.top < 0;
        setShowSticky(!entry.isIntersecting && isPastButtons);
      },
      { threshold: 0 }
    );

    if (purchaseRef.current) {
      observer.observe(purchaseRef.current);
    }

    const handleWheel = (e: WheelEvent) => {
      if (!relatedGridRef.current) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; 
      
      const rect = relatedGridRef.current.getBoundingClientRect();
      const isOver = e.clientX >= rect.left && e.clientX <= rect.right && 
                     e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      if (isOver) {
        e.preventDefault();
        relatedGridRef.current.scrollLeft += e.deltaY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Mock product data
  const product = {
    _id: '1',
    name: 'The Empress Medallion Necklace',
    slug: slug,
    price: 4500,
    discountPrice: 3800,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=687&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1170&auto=format&fit=crop'
    ],
    category: 'Necklaces',
    description: 'A masterpiece of heritage craftsmanship. This medallion features intricate hand-carved gold plating accented with ethereal pearls. Inspired by the royal courts of ancient India, it is designed for those who appreciate history in every detail.',
    material: '18KT Gold Vermeil on 925 Sterling Silver',
    stock: 12,
    sku: 'EMP-M-001'
  };

  const isFavorite = isInWishlist(product._id);

  const toggleWishlist = () => {
    if (isFavorite) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  const relatedProducts = [
    { _id: '2', name: 'Gold Plated Jhumkas', slug: 'gold-plated-jhumkas', price: 1800, discountPrice: 1200, images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800&auto=format&fit=crop'], category: 'Earrings' },
    { _id: '3', name: 'Pearl Bridal Bangle', slug: 'pearl-bridal-bangle', price: 4500, discountPrice: 3200, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1170&auto=format&fit=crop'], category: 'Bangles' },
    { _id: '4', name: 'Regal Nose Pin', slug: 'regal-nose-pin', price: 1250, discountPrice: 850, images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop'], category: 'Nose Pins' },
    { _id: '5', name: 'Traditional Maang Tikka', slug: 'traditional-maang-tikka', price: 2200, discountPrice: 1650, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=687&auto=format&fit=crop'], category: 'Headwear' },
    { _id: '6', name: 'Temple Coin Necklace', slug: 'temple-coin-necklace', price: 5500, discountPrice: 4200, images: ['https://images.unsplash.com/photo-1620967261971-ce4f09d8aa3f?q=80&w=1170&auto=format&fit=crop'], category: 'Necklaces' },
    { _id: '7', name: 'Antique Silver Choker', slug: 'antique-silver-choker', price: 3800, discountPrice: 2900, images: ['https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1170&auto=format&fit=crop'], category: 'Chokers' }
  ];

  return (
    <div className={styles.pageWrapper}>
      <div className={`container ${styles.productContainer}`}>
        {/* LEFT COLUMN - GALLERY */}
        <div className={styles.gallery}>
          {product.images.map((img, idx) => (
            <div key={idx} className={styles.galleryItem}>
              <Image 
                src={img} 
                alt={`${product.name} view ${idx + 1}`} 
                fill
                className={styles.img}
                sizes="(max-width: 992px) 100vw, 65vw"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN - STICKY DETAILS */}
        <div className={styles.info}>
          <div className={styles.breadcrumbs}>
             <span>Home</span> <span>/</span> <span>Jewellery</span> <span>/</span> <span>{product.category}</span>
          </div>
          
          <h1 className={styles.name}>{product.name}</h1>
          
          <div className={styles.priceRow}>
            <div className={styles.price}>
              ₹{product.discountPrice || product.price}
              {product.discountPrice && <span className={styles.oldPrice}>₹{product.price}</span>}
              {product.discountPrice && (
                <span style={{ marginLeft: '10px', fontSize: '0.8rem', background: '#000', color: '#fff', padding: '2px 8px', fontWeight: 600 }}>
                  SAVE {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </span>
              )}
            </div>
            <span className={styles.taxInfo}>Price inclusive of all taxes.</span>
          </div>

          <p className={styles.description}>{product.description}</p>
          
          {/* Metal Selector */}
          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Material: <span style={{color: '#888', fontWeight: 400}}>{selectedMetal === 'gold' ? '18KT Gold Vermeil' : '925 Sterling Silver'}</span></span>
            <div className={styles.swatches}>
              <div 
                className={`${styles.swatch} ${selectedMetal === 'gold' ? styles.active : ''}`}
                style={{ backgroundColor: '#C29958' }}
                onClick={() => setSelectedMetal('gold')}
              ></div>
              <div 
                className={`${styles.swatch} ${selectedMetal === 'silver' ? styles.active : ''}`}
                style={{ backgroundColor: '#E5E5E5' }}
                onClick={() => setSelectedMetal('silver')}
              ></div>
            </div>
          </div>

          {/* Size Selector */}
          <div className={styles.selector}>
            <span className={styles.selectorLabel}>Size:</span>
            <div className={styles.pills}>
              {['one-size', 'Adjustable', 'Custom'].map(size => (
                <div 
                  key={size}
                  className={`${styles.pill} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.purchaseOptions} ref={purchaseRef}>
            <button 
              className="btn-premium flex-1"
              style={{ padding: '18px', fontSize: '1.1rem', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '1px' }}
              onClick={() => addToCart(product, quantity)}
            >
              Add to Bag
            </button>
            <button 
              className={`${styles.wishBtn} ${isFavorite ? styles.active : ''}`}
              style={{ borderRadius: '0' }}
              onClick={toggleWishlist}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <button 
            className="btn-premium" 
            style={{ width: '100%', padding: '18px', background: '#000', color: '#fff', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}
          >
            Buy It Now
          </button>

          {/* Trust Grid - Horizontal Minimalist */}
          <div className={styles.trustGrid} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', borderRadius: '0' }}>
            <div className={styles.trustItem}><ShieldCheck size={16} /> 1 Year Warranty</div>
            <div className={styles.trustItem}><RotateCcw size={16} /> 7 Day Return</div>
            <div className={styles.trustItem}><Truck size={16} /> Free Shipping</div>
          </div>

          <div className={styles.accordion}>
            <AccordionItem title="Product Description">{product.description}</AccordionItem>
            <AccordionItem title="Materials & Care">
              <p>Crafted with {product.material}. Store in provided box. Avoid contact with liquids.</p>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p>Dispatched within 24 hours. Free pan-India shipping.</p>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE FOOTER */}
      <div className={`${styles.stickyFooter} ${showSticky ? styles.visible : ''}`}>
        <div className={styles.stickyPrice}>
          <span style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase' }}>Total</span>
          <span className={styles.stickyPriceVal}>₹{product.discountPrice || product.price}</span>
        </div>
        <button className={styles.stickyActionBtn} onClick={() => addToCart(product, quantity)}>
          Add to Bag
        </button>
        <button className={`${styles.stickyActionBtn} ${styles.buyNowBtn}`}>
          Buy Now
        </button>
      </div>

      {/* REVIEWS SECTION */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <div className="section-title">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem' }}>Customer Voices</h2>
          </div>
          <div className={styles.reviewGrid}>
            {[1, 2, 3].map(i => (
              <div key={i} className={styles.reviewCard}>
                <div style={{ display: 'flex', gap: '2px', color: 'var(--primary)', marginBottom: '15px' }}>
                  {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '15px', color: '#444' }}>"Absolutely breathtaking piece. The craftsmanship in the medallion is superior to anything I've bought before."</p>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sarah M. <span style={{ fontWeight: 400, color: '#999', marginLeft: '10px' }}>Verified Buyer</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className={`container ${styles.related}`}>
        <h2>Complete Your Look</h2>
        <div className={styles.relatedGrid} ref={relatedGridRef}>
          {relatedProducts.map(p => (
            <div key={p._id} className={styles.relatedCardWrapper}>
              <ProductCard product={p as any} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
