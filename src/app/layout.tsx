import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-serif',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Dagina Dalan | Premium Artificial Jewellery Store",
  description: "Discover our elegant collection of handcrafted artificial jewellery. From Kundan necklaces to bridal sets, find the perfect piece for every occasion.",
  keywords: "jewellery, artificial jewellery, kundan, bridal sets, luxury accessories",
  openGraph: {
    title: "Dagina Dalan | Premium Artificial Jewellery Store",
    description: "Elegant handcrafted jewellery for every occasion.",
    images: ["/og-image.jpg"],
  },
};

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${cormorant.variable}`} suppressHydrationWarning>
        <NextAuthProvider>
          <CartProvider>
            <WishlistProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </WishlistProvider>
          </CartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
