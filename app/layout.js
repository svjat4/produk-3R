// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.jajananmagetan.biz.id"), // WAJIB untuk SEO Next.js 14+
  title: {
    default: "Oleh-oleh Khas Magetan | Toko Jajanan Produk 3R",
    template: "%s | Produk 3R Magetan" // Otomatis nambahin nama toko di tiap sub-halaman
  },
  description: "Pusat oleh-oleh khas Magetan terlengkap. Sedia Roti Bolu Rahayu, Jeruk Pamelo, Emping Melinjo, dan lainnya. Pesan mudah via WhatsApp!",
  keywords: ["Oleh-oleh Magetan", "Roti Bolu Rahayu", "Jeruk Pamelo", "Wisata Magetan", "Jajanan Khas Magetan"],
  // KEYWORDS YANG SUDAH DIOPTIMASI (Long-tail & High Traffic)
  keywords: [
    "Oleh-oleh khas Magetan", 
    "Roti Bolu Rahayu Magetan", 
    "Harga Bolu Rahayu Magetan",
    "Jeruk Pamelo Magetan", 
    "Jajanan khas Magetan Jawa Timur",
    "Oleh-oleh dekat Telaga Sarangan",
    "Camilan khas lereng Lawu",
    "Kerupuk Lempeng Magetan",
    "Sambel Pecel asli Magetan",
    "Toko jajanan murah di Magetan",
    "Pusat oleh-oleh Magetan terdekat",
    "Jual Bolu Rahayu online",
    "Produk 3R Magetan"
  ],
  creator: "R. Rifai Arsandi",
  publisher: "Produk 3R Magetan",
  formatDetection: {
    email: false,
    address: true,
    telephone: true, // Otomatis deteksi nomor WA agar bisa diklik di HP
  },
  openGraph: {
<<<<<<< HEAD
    title: "Oleh-oleh Khas Magetan - Pesan Online",
    description: "Jajanan khas Magetan kualitas premium, kirim ke seluruh Indonesia.",
    url: "https://www.jajananmagetan.biz.id/",
    siteName: "Mampir Magetan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
=======
    title: "Oleh-oleh Khas Magetan - Pesan Online Langsung Dari Sumbernya",
    description: "Jajanan khas Magetan kualitas premium, kirim ke seluruh Indonesia. Segar & Asli dari lereng Gunung Lawu.",
    url: "https://www.jajananmagetan.biz.id/",
    siteName: "Produk 3R Magetan",
    images: [
      {
        url: "/og-image.jpg", // Pastikan file ini ada di folder public
        width: 1200,
        height: 630,
        alt: "Koleksi Oleh-oleh Khas Magetan Produk 3R",
      },
    ],
>>>>>>> 51fce57 (update: optimasi SEO, robots, og-image)
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  // Tambahkan JSON-LD Schema untuk Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Toko Oleh-oleh Produk 3R Magetan",
    "image": "https://www.jajananmagetan.biz.id/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Magetan", // Sesuaikan alamat aslinya
      "addressLocality": "Magetan",
      "addressRegion": "Jawa Timur",
      "postalCode": "63314",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.654, // Opsional: Koordinat maps
      "longitude": 111.321
    },
    "url": "https://www.jajananmagetan.biz.id",
    "telephone": "+6281231773663", // Sesuaikan nomor WA
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <html lang="id">
      <head>
        {/* Inject Schema ke dalam Head agar Google langsung baca identitas toko */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#FCFCFC] text-gray-900 antialiased`}>
        <CartProvider>
          <Navbar /> 
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
