// app/sitemap.js
import { PRODUCTS } from "@/data/products";

export default function sitemap() {
  const baseUrl = "https://www.jajananmagetan.biz.id";

  // Halaman statis
  const staticRoutes = [
    "",
    "/produk",
    "/keranjang",
    "/tentang",
    "/kontak",
    "/kategori/oleh-oleh-khas-magetan",
    "/kategori/jajanan-khas-magetan",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Halaman produk (dynamic)
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}