export default function manifest() {
  return {
    name: "Produk 3R Magetan - Oleh-Oleh Khas Magetan",
    short_name: "Produk 3R",
    description:
      "Pusat oleh-oleh khas Magetan. Menyediakan Rengginang, Wajik, Madu Mongso, dan camilan tradisional berkualitas.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#059669",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}