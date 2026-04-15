export const metadata = {
  title: "Semua Produk Oleh-oleh Khas Magetan",
  description:
    "Lihat semua produk oleh-oleh khas Magetan dari Produk 3R. Tersedia rengginang, madu mongso, keripik tempe, lempeng puli, sambel kacang, dan jajanan tradisional lainnya.",
  keywords: [
    "produk oleh-oleh Magetan",
    "katalog jajanan khas Magetan",
    "semua produk Magetan",
    "oleh-oleh khas Magetan",
    "jajanan tradisional Magetan",
    "Produk 3R Magetan",
  ],
  openGraph: {
    title: "Semua Produk Oleh-oleh Khas Magetan | Produk 3R Magetan",
    description:
      "Jelajahi katalog lengkap oleh-oleh khas Magetan seperti rengginang, madu mongso, keripik tempe, dan camilan tradisional pilihan.",
    url: "https://www.jajananmagetan.biz.id/produk",
    siteName: "Produk 3R Magetan",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katalog Produk Oleh-oleh Khas Magetan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Semua Produk Oleh-oleh Khas Magetan | Produk 3R Magetan",
    description:
      "Katalog lengkap oleh-oleh khas Magetan untuk keluarga, hampers, dan buah tangan.",
    images: ["/og-image.jpg"],
  },
};

export default function ProdukLayout({ children }) {
  return children;
}