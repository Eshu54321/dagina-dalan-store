'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from './AddProduct.module.css';

const AddProduct = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discountPrice: '',
    description: '',
    material: '',
    sku: '',
    stock: '',
    isFeatured: false,
    images: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Product added successfully!');
    router.push('/admin/products');
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <Link href="/admin/products" className={styles.backLink}>
            <ArrowLeft size={18} /> Back to Products
          </Link>
          <h1>Add New Product</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <section className={styles.formSection}>
              <h3>General Information</h3>
              <div className={styles.inputGroup}>
                <label>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5} required />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="earrings">Earrings</option>
                    <option value="rings">Rings</option>
                    <option value="bridal">Bridal Sets</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label>Material</label>
                  <input type="text" name="material" value={formData.material} onChange={handleChange} />
                </div>
              </div>
            </section>

            <section className={styles.formSection}>
              <h3>Pricing & Stock</h3>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Base Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Discount Price (₹)</label>
                  <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>SKU</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
                </div>
              </div>
              <div className={styles.checkboxGroup}>
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
                <label>Feature on Home Page</label>
              </div>
            </section>

            <section className={`${styles.formSection} ${styles.imageSection}`}>
              <h3>Product Images</h3>
              <div className={styles.uploadBox}>
                <Upload size={30} />
                <p>Drag & drop or <span>Browse</span></p>
                <input type="file" multiple />
              </div>
              <div className={styles.previewGrid}>
                {/* Image previews would go here */}
              </div>
            </section>
          </div>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>
            <button type="submit" className="btn-premium"><Save size={18} /> Save Product</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
