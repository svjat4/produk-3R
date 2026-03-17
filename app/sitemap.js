// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://www.jajananmagetan.biz.id/';

  // Daftar halaman statis
  const routes = ['', '/keranjang'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0,
  }));

  // Jika nanti kamu punya data produk dari file data/products.js
  // Kamu bisa looping di sini agar tiap produk punya link sendiri di Google
  // Contoh:
  /*
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/produk/${product.slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.8,
  }));
  */

  return [...routes];
}
