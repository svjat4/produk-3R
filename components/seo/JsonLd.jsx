import Script from 'next/script';

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.jajananmagetan.biz.id/#business",
        "name": "Oleh Oleh Khas Magetan - JajananMagetan.biz.id",
        "image": "https://www.jajananmagetan.biz.id/logo.jpg",
        "telephone": "+6281234567890", // Ganti dengan WA Anda
        "url": "https://www.jajananmagetan.biz.id",
        "priceRange": "Rp10.000 - Rp150.000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Pusat UMKM Magetan", // Sesuaikan alamat
          "addressLocality": "Magetan",
          "addressRegion": "Jawa Timur",
          "postalCode": "63311",
          "addressCountry": "ID"
        },
        "description": "Distributor, supplier, dan pusat grosir oleh oleh khas Magetan, snack, dan jajanan tradisional UMKM Magetan."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.jajananmagetan.biz.id/#website",
        "url": "https://www.jajananmagetan.biz.id",
        "name": "Jajanan Magetan",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.jajananmagetan.biz.id/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <Script
      id="global-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      strategy="afterInteractive"
    />
  );
}