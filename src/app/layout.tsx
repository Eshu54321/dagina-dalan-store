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
  title: "Dagina Dalan | Premium Imitation & 1 Gram Gold Jewellery Store",
  description: "Experience the allure of Premium Imitation and 1 Gram Gold Jewellery. Handcrafted elegance for every celebration, from bridal sets to daily essentials.",
  keywords: "imitation jewellery, 1 gram gold, premium fashion jewellery, bridal imitation, luxury gold plated-accessories, kundan, wedding jewellery",
  openGraph: {
    title: "Dagina Dalan | Premium Imitation & 1 Gram Gold Jewellery Store",
    description: "Elegant handcrafted imitation and 1 gram gold jewellery for every heritage.",
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
