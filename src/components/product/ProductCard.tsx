'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: string[];
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isFavorite = isInWishlist(product._id);

  const toggleWishlist = () => {
    if (isFavorite) removeFromWishlist(product._id);
    else addToWishlist(product);
  };

  const discount = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null;

  return (
    <motion.div 
      className={styles.card}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageWrapper}>
        <Link href={`/product/${product.slug}`}>
          <Image 
            src={product.images[0]} 
            alt={product.name} 
            fill
            className={styles.productImage}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>
        
        {/* Ribbons from screenshot */}
        <div className={styles.ribbonWrapper}>
          <div className={`${styles.ribbon} ${styles.primary}`}>Buy 1 Get 1</div>
          {discount && <div className={`${styles.ribbon} ${styles.secondary}`} style={{ top: '38px' }}>FLAT {discount}% OFF</div>}
        </div>
        
        <button 
          className={`${styles.wishBtnOverlay} ${isFavorite ? styles.active : ''}`}
          onClick={toggleWishlist}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} stroke={isFavorite ? 'var(--primary)' : 'currentColor'} />
        </button>

        <button 
          className={styles.quickAddBtn}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product, 1);
          }}
        >
          <ShoppingBag size={18} />
        </button>
      </div>
      
      <div className={styles.content}>
        <Link href={`/product/${product.slug}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <div className={styles.priceContainer}>
          {product.discountPrice ? (
            <>
              <span className={styles.discountPrice}>₹ {new Intl.NumberFormat('en-IN').format(product.discountPrice)}</span>
              <span className={styles.originalPrice}>₹ {new Intl.NumberFormat('en-IN').format(product.price)}</span>
              <span className={styles.discountPercent}>({discount}%)</span>
            </>
          ) : (
            <span className={styles.price}>₹ {new Intl.NumberFormat('en-IN').format(product.price)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
