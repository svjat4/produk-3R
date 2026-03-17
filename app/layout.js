// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext"; // Import Provider
import Navbar from "@/components/Navbar"; // Gunakan Navbar dari components
import Footer from "@/components/Footer"; // Gunakan Footer dari components

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oleh-oleh Khas Magetan | Toko Jajanan Lereng Lawu",
  description: "Pusat oleh-oleh khas Magetan terlengkap. Sedia Roti Bolu Rahayu, Jeruk Pamelo, Emping Melinjo, dan lainnya. Pesan mudah via WhatsApp!",
  keywords: "Oleh-oleh Magetan, Roti Bolu Rahayu, Jeruk Pamelo, Wisata Magetan, Jajanan Khas",
  authors: [{ name: "Toko Oleh-oleh Magetan" }],
  openGraph: {
    title: "Oleh-oleh Khas Magetan - Pesan Online",
    description: "Jajanan khas Magetan kualitas premium, kirim ke seluruh Indonesia.",
    url: "http://localhost:3000",
    siteName: "Mampir Magetan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Membungkus seluruh aplikasi dengan CartProvider */}
        <CartProvider>
          <Navbar /> 
          
          {children}

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}