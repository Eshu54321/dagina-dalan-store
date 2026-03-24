'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, Heart, Facebook, Instagram, Youtube } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import TopBar from './TopBar';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const { cartCount } = useCart();
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <TopBar />
      <nav className={styles.navbar} suppressHydrationWarning>
        {/* Logo & Actions Row */}
        <div className={styles.logoRow} suppressHydrationWarning>
          <div className={`container ${styles.logoContainer}`} suppressHydrationWarning>
            <div className={styles.hamburger} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} suppressHydrationWarning>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </div>
            
            <div className={styles.dummySide} suppressHydrationWarning>
              <Link href="#"><Facebook size={18} className={styles.icon} /></Link>
              <Link href="#"><Instagram size={18} className={styles.icon} /></Link>
              <Link href="#"><Youtube size={18} className={styles.icon} /></Link>
            </div>

            <div className={styles.logo} suppressHydrationWarning>
              <Link href="/">
                <span>DAGINA</span> DALAN
              </Link>
            </div>

            <div className={styles.navActions} suppressHydrationWarning>
              <Search size={20} className={styles.icon} />
              <Link href="/wishlist"><Heart size={20} className={styles.icon} /></Link>
              <Link href="/profile"><User size={20} className={styles.icon} /></Link>
              <Link href="/cart" className={styles.cartBtn}>
                <ShoppingBag size={20} />
                {mounted && cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Row */}
        <div className={styles.menuRow} suppressHydrationWarning>
          <div className="container" suppressHydrationWarning>
            <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`} suppressHydrationWarning>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>All Jewellery</Link>
              <Link href="/categories/necklaces" onClick={() => setIsMobileMenuOpen(false)}>Necklaces</Link>
              <Link href="/categories/earrings" onClick={() => setIsMobileMenuOpen(false)}>Earrings</Link>
              <Link href="/categories/rings" onClick={() => setIsMobileMenuOpen(false)}>Rings</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            </div>
          </div>
        </div>
      </nav>
  </header>
);
};

export default Navbar;
