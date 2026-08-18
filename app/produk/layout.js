const SITE_URL = "https://www.jajananmagetan.biz.id";

export const metadata = {
  alternates: {
    canonical: `${SITE_URL}/produk`,
  },
  title: "Katalog Produk Oleh-oleh Khas Magetan Terlengkap",
  description:
    "Pusat belanja oleh-oleh khas Magetan resmi dari Produk 3R. Menyediakan Rengginang renyah, Madu Mongso legit, Keripik Tempe, Lempeng Puli beras pilihan, dan Sambel Kacang asli Magetan Jawa Timur.",
  keywords: [
    "oleh-oleh khas Magetan",
    "jajanan khas Magetan",
    "Produk 3R Magetan",
    "katalog produk 3R",
    "rengginang renyah Magetan",
    "madu mongso khas Magetan",
    "keripik tempe Magetan",
    "lempeng puli beras Magetan",
    "sambel kacang khas Magetan",
    "pusat oleh-oleh Magetan",
    "grosir snack Magetan",
    "hampers makanan khas Magetan",
  ],
  other: {
    "geo.region": "ID-JI",
    "geo.placename": "Kabupaten Magetan",
    "geo.position": "-7.6521;111.3263",
    ICBM: "-7.6521, 111.3263",
  },
  openGraph: {
    title: "Katalog Oleh-oleh Khas Magetan Terlengkap | Produk 3R",
    description:
      "Beli langsung oleh-oleh khas Magetan asli dari produsen. Tersedia paket hampers, porsi grosir reseller, dan pengiriman aman ke seluruh Indonesia.",
    url: `${SITE_URL}/produk`,
    siteName: "Produk 3R Magetan",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Katalog Produk Oleh-oleh Khas Magetan - Produk 3R",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katalog Oleh-oleh Khas Magetan Terlengkap | Produk 3R",
    description:
      "Camilan & jajanan tradisional khas Magetan dengan garansi rasa asli dan kualitas terbaik.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function ProdukLayout({ children }) {
  const produkJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/produk/#webpage`,
        url: `${SITE_URL}/produk`,
        name: "Katalog Produk Oleh-oleh Khas Magetan",
        description:
          "Pusat katalog makanan dan jajanan tradisional khas Magetan dari Produk 3R.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Katalog Produk",
              item: `${SITE_URL}/produk`,
            },
          ],
        },
      },
      {
        "@type": "Store",
        "@id": `${SITE_URL}/#store`,
        name: "Produk 3R Magetan - Pusat Oleh-oleh Khas Magetan",
        url: `${SITE_URL}/produk`,
        image: `${SITE_URL}/og-image.jpg`,
        description:
          "Produsen dan toko resmi penyedia makanan, camilan, dan jajanan oleh-oleh khas Magetan Jawa Timur.",
        telephone: "+6281231773663",
        priceRange: "Rp10.000 - Rp150.000",
        hasMap: "https://share.google/StJEZjxuvKRLJOSdg",
        sameAs: [
          "https://share.google/StJEZjxuvKRLJOSdg",
          "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8",
          "https://instagram.com/produk3r.magetan",
        ],
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Manggis No. 33",
          addressLocality: "Magetan",
          addressRegion: "Jawa Timur",
          postalCode: "63314",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -7.6521,
          longitude: 111.3263,
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        knowsAbout: [
          "Oleh-oleh Khas Magetan",
          "Jajanan Tradisional Jawa Timur",
          "Rengginang",
          "Madu Mongso",
          "Lempeng Puli",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(produkJsonLd) }}
      />
      {children}
    </>
  );
}