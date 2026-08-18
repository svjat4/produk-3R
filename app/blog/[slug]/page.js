import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  User,
  ChevronRight,
  TrendingUp,
  Clock,
  Share2
} from 'lucide-react';
import { blogPosts } from '@/data/blog';

const SITE_URL = 'https://www.jajananmagetan.biz.id';
const SITE_NAME = 'Produk 3R Magetan';

// Helper function untuk format tanggal
const formatDate = (dateString, format = 'long') => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
  });
};

// Generate URL statis untuk semua artikel
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan | Produk 3R Magetan',
      description: 'Artikel yang Anda cari tidak ditemukan.',
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : undefined;

  return {
    title: `${post.title} | Blog Produk 3R Magetan`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'id_ID',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 675,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  // ==========================================
  // DATA PREPARATION: FILTERING LAINNYA
  // ==========================================
  const otherPosts = blogPosts.filter((item) => item.slug !== slug);

  // Ambil 4 artikel terbaru untuk sidebar
  const latestPosts = [...otherPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  // Ambil 3 artikel populer
  const popularPosts = otherPosts.slice(0, 3);

  // ==========================================
  // SCHEMA ORG
  // ==========================================
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    url: canonicalUrl,
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [`${SITE_URL}${post.image}`] : undefined,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.jpg`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'id-ID',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const whatsappText = encodeURIComponent(`Halo, saya membaca artikel "${post.title}" di blog dan tertarik untuk bertanya tentang produk.`);

  return (
    <main className="bg-gray-50 min-h-screen py-10 md:py-16">
      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 
        SaaS Layout: Container utama lebih lebar, dibagi jadi Grid.
        lg:grid-cols-12 dimana 8 kolom untuk artikel, 4 kolom untuk sidebar
      */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB - Di luar grid agar rapi di atas */}
        <nav aria-label="Breadcrumb" className="mb-6 lg:mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                Beranda
              </Link>
            </li>
            <li><ChevronRight size={14} className="text-gray-400" /></li>
            <li>
              <Link href="/blog" className="hover:text-green-600 transition-colors">
                Blog
              </Link>
            </li>
            <li><ChevronRight size={14} className="text-gray-400" /></li>
            <li aria-current="page" className="text-gray-900 font-medium line-clamp-1 max-w-[200px] sm:max-w-md">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          
          {/* ==========================================
              MAIN CONTENT (KIRI)
          ========================================== */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* ARTICLE HEADER */}
            <header className="p-6 md:p-10 lg:p-12 pb-6 md:pb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.2] mb-6 tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-y border-gray-100 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-900">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <div className="flex items-center gap-2 sm:ml-auto cursor-pointer hover:text-green-600 transition-colors">
                  <Share2 size={16} />
                  <span>Bagikan</span>
                </div>
              </div>
            </header>

            {/* COVER IMAGE */}
            {post.image && (
              <figure className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-gray-100">
                <Image
                  src={post.image}
                  alt={`Ilustrasi untuk artikel ${post.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </figure>
            )}

            {/* ARTICLE BODY */}
            <div className="p-6 md:p-10 lg:p-12 pt-8">
              <div
                className="
                  prose prose-lg md:prose-xl max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl md:prose-h3:text-2xl
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-green-600 prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-green-700
                  prose-strong:text-gray-900 
                  prose-li:text-gray-700 
                  prose-img:rounded-2xl prose-img:border prose-img:border-gray-100 prose-img:shadow-sm
                  prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-green-50/50 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-800 prose-blockquote:not-italic
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* SAAS STYLE CTA (Di bawah artikel) */}
              <div className="mt-16 p-8 md:p-10 bg-gradient-to-br from-green-50 to-emerald-50/30 rounded-3xl border border-green-100">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Tertarik dengan Jajanan Khas Magetan?
                  </h2>
                  <p className="text-gray-600 mb-8 text-lg">
                    Kami menyediakan harga khusus untuk grosir dan *reseller*. Hubungi tim kami sekarang untuk mendapatkan katalog produk terbaru dari Produk 3R Magetan.
                  </p>
                  <Link
                    href={`https://wa.me/6281231773663?text=${whatsappText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 px-8 rounded-full transition-all shadow-sm hover:shadow-md"
                  >
                    Tanya via WhatsApp
                  </Link>
                </div>
              </div>
              
            </div>
          </article>

          {/* ==========================================
              SIDEBAR (KANAN)
          ========================================== */}
          <aside className="lg:col-span-4 space-y-8">
            {/* 
              sticky top-8 membuat sidebar akan ikut turun/menempel 
              saat user membaca artikel ke bawah 
            */}
            <div className="sticky top-8 space-y-10">

              {/* WIDGET: ARTIKEL TERBARU */}
              {latestPosts.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={20} className="text-green-600" />
                    <h3 className="font-bold text-lg text-gray-900 tracking-tight">
                      Baru Saja Dirilis
                    </h3>
                  </div>
                  
                  <ul className="flex flex-col gap-6">
                    {latestPosts.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blog/${item.slug}`} className="group block">
                          <p className="text-xs text-gray-500 mb-1.5 font-medium">
                            {formatDate(item.date, 'short')}
                          </p>
                          <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-green-600 transition-colors line-clamp-3">
                            {item.title}
                          </h4>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 mt-6 pt-6 border-t border-gray-100 w-full"
                  >
                    Lihat semua artikel <ArrowLeft size={14} className="rotate-180" />
                  </Link>
                </div>
              )}

              {/* WIDGET: REKOMENDASI POPULER (dengan gambar kecil) */}
              {popularPosts.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={20} className="text-green-600" />
                    <h3 className="font-bold text-lg text-gray-900 tracking-tight">
                      Pilihan Editor
                    </h3>
                  </div>
                  
                  <div className="flex flex-col gap-5">
                    {popularPosts.map((item) => (
                      <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex items-start gap-4">
                        {item.image ? (
                          <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="80px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 shrink-0 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <span className="text-gray-300 text-xs">No img</span>
                          </div>
                        )}
                        <div className="flex-1 py-1">
                          <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-green-600 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* WIDGET: ABOUT SENDER (Opsional ala SaaS) */}
              <div className="bg-gray-900 rounded-3xl p-6 md:p-8 text-white shadow-md">
                <h3 className="font-bold text-xl mb-2 text-white">Produk 3R Magetan</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  Pusat jajanan dan oleh-oleh khas Magetan berkualitas premium. Melayani grosir dan eceran dengan jaminan rasa autentik.
                </p>
                <Link 
                  href="/" 
                  className="text-sm font-semibold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1.5"
                >
                  Kunjungi Toko <ArrowLeft size={14} className="rotate-180" />
                </Link>
              </div>

            </div>
          </aside>
          
        </div>
      </div>
    </main>
  );
}