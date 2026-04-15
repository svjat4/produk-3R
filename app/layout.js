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
const siteTitle = "Oleh-oleh Khas Magetan | Produk 3R Magetan";
const siteDescription =
  "Pusat oleh-oleh khas Magetan. Tersedia rengginang, madu mongso, keripik tempe, lempeng puli, sambel kacang, dan jajanan tradisional pilihan. Pesan mudah via WhatsApp.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Produk 3R Magetan",
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
    "madu mongso Magetan",
    "rengginang Magetan",
    "keripik tempe Magetan",
    "lempeng puli Magetan",
    "sambel kacang Magetan",
    "produk 3R Magetan",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
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
    description:
      "Pusat jajanan khas Magetan dengan pilihan camilan tradisional dan oleh-oleh favorit.",
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
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.jpg`,
    image: `${siteUrl}/logo.jpg`,
    sameAs: [
      "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8",
      "https://instagram.com/username_anda",
    ],
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    image: `${siteUrl}/logo.jpg`,
    url: siteUrl,
    telephone: "+6281231773663",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Manggis No. 33",
      addressLocality: "Magetan",
      addressRegion: "Jawa Timur",
      postalCode: "63314",
      addressCountry: "ID",
    },
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
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "id-ID",
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
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