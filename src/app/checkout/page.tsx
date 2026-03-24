'use client';

import React, { useState } from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';

const CheckoutPage = () => {
  const { cart, cartTotal } = useCart();
  const [showSummary, setShowSummary] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Load Razorpay script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create order
    const data = await fetch("/api/checkout/razorpay", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotal }),
    }).then((t) => t.json());

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: "Dagina Dalan",
      description: "Jewellery Purchase",
      order_id: data.id,
      handler: async function (response: any) {
        const result = await fetch("/api/checkout/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }).then((res) => res.json());

        if (result.status === "ok") {
          alert("Payment successful!");
          window.location.href = "/profile/orders";
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#C9A227",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className={styles.checkoutWrapper}>
      <div className="container">
        <header className={styles.header}>
          <h1>Checkout</h1>
        </header>

        <div className={styles.layout}>
          {/* MOBILE ONLY: Collapsible Summary */}
          <aside className={styles.summary}>
            <div className={styles.summaryToggle} onClick={() => setShowSummary(!showSummary)}>
              <span><ShoppingBag size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> {showSummary ? 'Hide' : 'Show'} Order Summary</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{cartTotal}</span>
            </div>
            
            <div className={styles.summaryContent} style={{ maxHeight: showSummary ? '800px' : '0' }}>
              <div className={styles.itemList} style={{ marginTop: '20px' }}>
                {cart.map(item => (
                  <div key={item._id} className={styles.item}>
                    <div className={styles.itemInfo}>
                      <p>{item.name} <span style={{ color: '#888', marginLeft: '5px' }}>x {item.quantity}</span></p>
                    </div>
                    <p className={styles.price}>₹{(item.discountPrice || item.price) * item.quantity}</p>
                  </div>
                ))}
              </div>
              
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping</span>
                  <span style={{ color: '#2ecc71', fontWeight: 700 }}>FREE</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
            </div>
          </aside>

          <form className={styles.form} onSubmit={handlePayment}>
             {/* Express Checkout Visual Section */}
             <div className={styles.expressCheckout}>
                <span className={styles.expressLabel}>Quick Mobile Checkout</span>
                <div className={styles.expressButtons}>
                  <div style={{ padding: '8px 15px', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}>
                    <span style={{ fontWeight: 700, color: '#5f27cd' }}>PhonePe</span> / <span style={{ fontWeight: 700, color: '#2ecc71' }}>GPay</span> / <span style={{ fontWeight: 700, color: '#eb4d4b' }}>Paytm</span>
                  </div>
                </div>
             </div>

            <section className={styles.section}>
              <h3>Contact Information</h3>
              <input 
                type="email" name="email" placeholder="Email Address" 
                value={formData.email} onChange={handleChange} required 
                autoComplete="email" inputMode="email"
              />
              <input 
                type="tel" name="phone" placeholder="Phone Number" 
                value={formData.phone} onChange={handleChange} required 
                autoComplete="tel" inputMode="tel"
              />
            </section>

            <section className={styles.section}>
              <h3>Shipping Address</h3>
              <input 
                type="text" name="name" placeholder="Full Name" 
                value={formData.name} onChange={handleChange} required 
                autoComplete="name"
              />
              <textarea 
                name="address" placeholder="Full Address with Landmark" rows={3}
                value={formData.address} onChange={handleChange} required 
                autoComplete="street-address"
              ></textarea>
              <div className={styles.row}>
                <input 
                  type="text" name="city" placeholder="City" 
                  value={formData.city} onChange={handleChange} required 
                  autoComplete="address-level2"
                />
                <input 
                  type="text" name="state" placeholder="State/UT" 
                  value={formData.state} onChange={handleChange} required 
                  autoComplete="address-level1"
                />
              </div>
              <input 
                type="text" name="zipCode" placeholder="Pincode (6-digits)" 
                value={formData.zipCode} onChange={handleChange} required 
                autoComplete="postal-code" inputMode="numeric" pattern="[0-9]*"
              />
            </section>

            <button type="submit" className={`btn-premium ${styles.desktopPayBtn}`} style={{ width: '100%', marginTop: '20px' }}>
              Pay Now (₹{cartTotal})
            </button>
          </form>
        </div>
      </div>

      {/* STICKY MOBILE FOOTER */}
      <div className={styles.stickyFooter}>
        <button type="button" onClick={handlePayment} className={`btn-premium ${styles.payBtn}`}>
          Pay ₹{cartTotal} Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
