'use client';

import React from 'react';
import Link from 'next/link';
import { User as UserIcon, ShoppingBag, MapPin, Heart, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Profile.module.css';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;
  }

  if (!session) {
    if (typeof window !== 'undefined') router.push('/login');
    return null;
  }

  // Combine session user with empty orders placeholder
  const orders: any[] = []; // Explicit type to avoid 'never'
  const userName = session.user?.name || 'User';
  const userEmail = session.user?.email || '';

  return (
    <div className={styles.profileWrapper}>
      <div className="container">
        <header className={styles.header}>
          <h1>My Account</h1>
          <button className={styles.logoutBtn} onClick={() => signOut()}><LogOut size={18} /> Logout</button>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>{userName[0]}</div>
              <h3>{userName}</h3>
              <p>{userEmail}</p>
            </div>
            <nav className={styles.nav}>
              <button className={styles.active}><ShoppingBag size={18} /> My Orders</button>
              <button><Heart size={18} /> Wishlist</button>
              <button><MapPin size={18} /> Addresses</button>
              <button><UserIcon size={18} /> Profile Settings</button>
            </nav>
          </aside>

          <main className={styles.content}>
            <section className={styles.ordersSection}>
              <h2>Recent Orders</h2>
              {orders.length === 0 ? (
                <p>No orders yet. <Link href="/shop" style={{ color: 'var(--gold-primary)' }}>Start shopping!</Link></p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>{order.id}</span>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                      <span className={`${styles.status} ${styles[order.status.toLowerCase()]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className={styles.orderFooter}>
                      <p>Total: <strong>₹{order.total}</strong></p>
                      <button className={styles.viewBtn}>View Details</button>
                    </div>
                  </div>
                ))
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
