'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+918828203068';
  const message = encodeURIComponent('Hello! I would like to know more about your jewellery collection.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={30} />
      <span className={styles.tooltip}>Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
