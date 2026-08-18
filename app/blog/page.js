import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowUpRight, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '@/data/blog';

const SITE_URL = 'https://www.jajananmagetan.biz.id';

// Helper function untuk format tanggal
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const metadata = {
  title: 'Blog & Insight Jajanan Khas Magetan | Produk 3R',
  description:
    'Pusat informasi resmi seputar kuliner khas Magetan, tips oleh-oleh, dan peluang usaha reseller bersama Produk 3R Magetan.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog & Insight Jajanan Khas Magetan | Produk 3R',
    description:
      'Informasi lengkap seputar jajanan khas Magetan, resep, serta panduan reseller snack.',
    url: `${SITE_URL}/blog`,
    siteName: 'Produk 3R Magetan',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function BlogPage() {
  // Urutkan postingan berdasarkan tanggal terbaru
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Pisahkan artikel utama (featured) dan sisanya
  const featuredPost = sortedPosts[0];
  const regularPosts = sortedPosts.slice(1);

  // Schema Org untuk Halaman Koleksi Blog (SEO)
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog Produk 3R Magetan',
    description: metadata.description,
    url: `${SITE_URL}/blog`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Produk 3R Magetan',
      url: SITE_URL,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: sortedPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <main className="bg-gray-50 min-h-screen py-10 md:py-16">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==========================================
            BREADCRUMB & HEADER
        ========================================== */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <ChevronRight size={14} className="text-gray-400" />
            </li>
            <li aria-current="page" className="text-gray-900 font-medium">
              Blog
            </li>
          </ol>
        </nav>

        <header className="mb-12 text-left md:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200/60 rounded-full text-green-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} />
            <span>Jurnal & Insight</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Kabar & Panduan Khas Magetan
          </h1>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Temukan artikel menarik seputar oleh-oleh khas Magetan, resep camilan tradisional, hingga strategi bisnis reseller bersama Produk 3R.
          </p>
        </header>

        {/* ==========================================
            FEATURED POST (HERO ARTICLE)
        ========================================== */}
        {featuredPost && (
          <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Gambar Featured */}
                {featuredPost.image && (
                  <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto min-h-[300px] lg:min-h-[420px] overflow-hidden bg-gray-100">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                        Artikel Terbaru
                      </span>
                    </div>
                  </div>
                )}

                {/* Konten Featured */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-green-600" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="text-green-600" />
                        {featuredPost.author}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-4">
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base line-clamp-3 leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-bold text-sm text-green-600 group-hover:text-green-700">
                    <span>Baca Selengkapnya</span>
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* ==========================================
            GRID ARTIKEL LAINNYA
        ========================================== */}
        {regularPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen size={20} className="text-green-600" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Semua Artikel
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
                    {/* Thumbnail Image */}
                    {post.image ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                          <Calendar size={14} className="text-green-600" />
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-green-600 group-hover:text-green-700">
                        <span>Baca Artikel</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================
            CTA BANNER (SAAS STYLE)
        ========================================== */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-900 to-green-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Peluang Usaha
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 leading-tight">
              Ingin Menjadi Reseller atau Membeli Grosir Jajanan Magetan?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
              Dapatkan penawaran harga pabrik, garansi produk segar, dan dukungan pemasaran untuk usaha camilan Anda.
            </p>
            <Link
              href="https://wa.me/6281231773663?text=Halo%2C%20saya%20tertarik%20dengan%20peluang%20reseller%20Produk%203R%20Magetan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-8 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              Hubungi Tim Penjualan
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}