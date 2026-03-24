'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3, 
  Megaphone,
  CreditCard,
  Truck,
  TicketPercent,
  LogOut,
  X
} from 'lucide-react';
import styles from './AdminSidebar.module.css';

const navItems = [
  { name: 'Overview', icon: LayoutDashboard, href: '/admin' },
  { name: 'Products', icon: Package, href: '/admin/products' },
  { name: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { name: 'Customers', icon: Users, href: '/admin/customers' },
  { name: 'Payments', icon: CreditCard, href: '/admin/payments' },
  { name: 'Shipping', icon: Truck, href: '/admin/shipping' },
  { name: 'Coupons', icon: TicketPercent, href: '/admin/coupons' },
  { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
  { name: 'Marketing', icon: Megaphone, href: '/admin/marketing' },
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar = ({ onClose }: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={styles.logoText}>DAGINA</span>
            <span className={styles.adminTag}>ADMIN</span>
          </div>
          <button 
            onClick={onClose}
            className={styles.mobileClose}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--admin-text-muted)', 
              cursor: 'pointer',
              padding: '8px',
              display: 'none' /* Handled in CSS */
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
