'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Cart.module.css';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingBag size={60} className="text-gold" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link href="/shop" className="btn-premium">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <div className="container">
        <header className={styles.header}>
          <h1>Shopping Bag</h1>
          <span>({cart.length} items)</span>
        </header>

        <div className={styles.layout}>
          <div className={styles.items}>
            {cart.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    sizes="100px"
                  />
                </div>
                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.slug}`}><h3>{item.name}</h3></Link>
                  <p className={styles.itemPrice}>₹{item.discountPrice || item.price}</p>
                  
                  <div className={styles.itemActions}>
                    <div className={styles.quantity}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                    <button 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 size={18} /> Remove
                    </button>
                  </div>
                </div>
                <div className={styles.itemTotal}>
                  ₹{(item.discountPrice || item.price) * item.quantity}
                </div>
              </div>
            ))}
            
            <Link href="/shop" className={styles.backBtn}>
              <ChevronLeft size={18} /> Continue Shopping
            </Link>
          </div>

          <aside className={styles.summary}>
            <h3>Order Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span className={styles.free}>FREE</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>Included</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <div className={styles.coupon}>
              <input type="text" placeholder="Coupon Code" />
              <button>Apply</button>
            </div>
            
            <Link href="/checkout" className={`btn-premium ${styles.desktopCheckoutBtn}`} style={{ width: '100%', textAlign: 'center', display: 'block' }}>
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      </div>

      {/* Sticky Mobile Footer */}
      <div className={styles.stickyActions}>
        <div className={styles.totalRow}>
          <span>Total ({cart.length} items)</span>
          <span className={styles.totalPrice}>₹{cartTotal}</span>
        </div>
        <Link href="/checkout" className="btn-premium">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
