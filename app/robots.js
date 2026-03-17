// app/robots.js
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/keranjang',      // Tidak perlu muncul di Google karena isinya personal per user
        '/checkout',       // Halaman proses bayar tidak perlu diindeks
        '/api/',           // Folder API backend jangan diintip bot
        '/*?*',            // Mencegah indeks URL dengan parameter (filter/search) agar tidak duplikat
      ],
    },
    sitemap: 'https://www.jajananmagetan.biz.id/sitemap.xml',
  }
}
