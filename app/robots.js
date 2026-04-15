// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/keranjang",
          "/checkout",
          "/api/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/keranjang",
          "/checkout",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.jajananmagetan.biz.id/sitemap.xml",
    host: "https://www.jajananmagetan.biz.id",
  };
}