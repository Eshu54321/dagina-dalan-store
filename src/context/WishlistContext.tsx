'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: any) => {
    if (wishlist.some(item => item._id === product._id)) return;
    setWishlist(prev => [...prev, {
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images ? product.images[0] : product.image,
      discountPrice: product.discountPrice
    }]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item._id !== productId));
  };

  const isInWishlist = (productId: string) => wishlist.some(item => item._id === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
