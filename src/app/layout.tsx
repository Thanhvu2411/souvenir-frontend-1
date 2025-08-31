import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/contexts/SearchContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giftie - Sản phẩm lưu niệm đặc trưng Việt Nam",
  description: "Chuyên cung cấp các sản phẩm lưu niệm đặc trưng từ các vùng miền Việt Nam. Chất lượng cao, giá cả hợp lý, giao hàng toàn quốc.",
  keywords: "giftie, lưu niệm, quà tặng, Việt Nam, móc khóa, túi xách, áo thun",
  authors: [{ name: "Giftie" }],
  openGraph: {
    title: "Giftie - Sản phẩm lưu niệm đặc trưng Việt Nam",
    description: "Chuyên cung cấp các sản phẩm lưu niệm đặc trưng từ các vùng miền Việt Nam",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
