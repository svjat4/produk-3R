// app/sitemap.js
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { blogPosts } from "@/data/blog";

export default async function sitemap() {
  const baseUrl = "https://www.jajananmagetan.biz.id";
  const currentDate = new Date();

  // 1. Halaman Statis Utama
  const staticRoutes = [
    { url: baseUrl, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/produk`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/tentang`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.6 },
  ];

  // 2. Halaman Kategori (Dinamis)
  const categoryRoutes = (CATEGORIES || []).map((category) => ({
    url: `${baseUrl}/kategori/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Halaman Produk Detail (Dinamis dengan Image Sitemap)
  const productRoutes = (PRODUCTS || []).map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
    images: product.image
      ? [product.image.startsWith("http") ? product.image : `${baseUrl}${product.image}`]
      : [],
  }));

  // 4. Halaman Artikel Blog (Dinamis)
  const blogRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
    images: post.coverImage
      ? [post.coverImage.startsWith("http") ? post.coverImage : `${baseUrl}${post.coverImage}`]
      : [],
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}