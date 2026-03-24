'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from './Wishlist.module.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className={styles.emptyWishlist}>
        <Heart size={60} className="text-gold" />
        <h2>Your Wishlist is Empty</h2>
        <p>Save items you love to find them easily later.</p>
        <Link href="/shop" className="btn-premium">Explore Collection</Link>
      </div>
    );
  }

  return (
    <div className={styles.wishlistWrapper}>
      <div className="container">
        <header className={styles.header}>
          <h1>My Wishlist</h1>
          <span>({wishlist.length} items)</span>
        </header>

        <div className="grid grid-4">
          {wishlist.map(item => (
            <div key={item._id} className={styles.wishlistItem}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className={styles.img} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromWishlist(item._id)}
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className={styles.content}>
                <Link href={`/product/${item.slug}`}><h3>{item.name}</h3></Link>
                <p className={styles.price}>₹{item.discountPrice || item.price}</p>
                <button 
                  className="btn-premium" 
                  style={{ width: '100%', padding: '10px' }}
                  onClick={() => {
                    addToCart(item, 1);
                    removeFromWishlist(item._id);
                  }}
                >
                  <ShoppingBag size={18} style={{ marginRight: '8px' }} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
