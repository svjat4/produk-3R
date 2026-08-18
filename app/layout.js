import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCartBar from "@/components/FloatingCartBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.jajananmagetan.biz.id";
const siteName = "Produk 3R Magetan";
const siteTitle = "Pusat Grosir Oleh-oleh & Snack Khas Magetan | Produk 3R";
const siteDescription =
  "Pusat grosir dan distributor oleh-oleh khas Magetan. Tersedia rengginang, madu mongso, keripik tempe, lempeng puli, dan jajanan tradisional UMKM pilihan. Pesan mudah via WhatsApp.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: "R. Rifai Arsandi" }],
  creator: "R. Rifai Arsandi",
  publisher: siteName,
  category: "food",
  keywords: [
    "oleh-oleh khas Magetan",
    "jajanan khas Magetan",
    "toko oleh-oleh Magetan",
    "pusat oleh-oleh Magetan",
    "grosir snack magetan",
    "distributor snack magetan",
    "madu mongso Magetan",
    "rengginang Magetan",
    "keripik tempe Magetan",
    "lempeng puli Magetan",
    "sambel kacang Magetan",
    "produk 3R Magetan",
    "kuliner Magetan Jawa Timur",
  ],
  alternates: {
    canonical: "./",
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Oleh-oleh khas Magetan Produk 3R",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "mAmTX8FopY4Z9AQfSPEKvn0lYF8rtpq9j1Q2Ws0xZOk",
  },
};

export default function RootLayout({ children }) {
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.jpg`,
        },
        description: siteDescription,
        knowsAbout: [
          "Oleh-oleh khas Magetan",
          "Kuliner Tradisional Jawa Timur",
          "Snack UMKM Magetan",
          "Rengginang",
          "Madu Mongso",
          "Lempeng Puli",
        ],
        sameAs: [
          "https://share.google/StJEZjxuvKRLJOSdg",
          "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8",
          "https://instagram.com/produk3r.magetan",
        ],
      },
      {
        "@type": ["LocalBusiness", "Store", "WholesaleStore"],
        "@id": `${siteUrl}/#localbusiness`,
        name: siteName,
        image: `${siteUrl}/logo.jpg`,
        url: siteUrl,
        telephone: "+6281231773663",
        priceRange: "Rp10.000 - Rp150.000",
        currenciesAccepted: "IDR",
        paymentAccepted: "Cash, Bank Transfer, QRIS",
        hasMap: "https://share.google/StJEZjxuvKRLJOSdg",
        sameAs: [
          "https://share.google/StJEZjxuvKRLJOSdg",
          "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8",
          "https://instagram.com/produk3r.magetan",
        ],
        parentOrganization: {
          "@id": `${siteUrl}/#organization`,
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
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "Magetan",
          },
          {
            "@type": "AdministrativeArea",
            name: "Jawa Timur",
          },
          {
            "@type": "Country",
            name: "Indonesia",
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "08:00",
            closes: "17:00",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: siteUrl,
        inLanguage: "id-ID",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd),
          }}
        />
      </head>

      <body
        className={`${inter.className} bg-[#FCFCFC] text-gray-900 antialiased`}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingCartBar />
        </CartProvider>
      </body>
    </html>
  );
}