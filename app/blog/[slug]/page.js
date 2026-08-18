import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { blogPosts } from '@/data/blog';

// 1. Generate URL Statis untuk SEO (Crawlability)
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// 2. Dynamic Metadata untuk setiap Artikel
export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  return {
    title: `${post.title} | Blog Produk 3R Magetan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPost({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // 3. Schema Markup BlogPosting (Wajib untuk SEO Artikel)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.jajananmagetan.biz.id/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://www.jajananmagetan.biz.id${post.image}`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Produk 3R Magetan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.jajananmagetan.biz.id/logo.jpg"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  };

  return (
    <main className="bg-[#fcfdfa] min-h-screen py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-gray-100 p-6 md:p-12 shadow-sm">
        {/* Breadcrumb / Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        {/* Header Artikel */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <User size={16} className="text-green-500" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-500" />
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-sm border border-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content (HTML) */}
        {/* Menggunakan prose untuk otomatis menata styling H2, P, UL, dll */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-img:rounded-xl text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Bawah Artikel */}
        <div className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tertarik dengan Jajanan Khas Magetan?</h3>
          <p className="text-gray-600 mb-6">Dapatkan penawaran harga grosir dan eceran terbaik langsung dari distributornya.</p>
          <Link 
            href="https://wa.me/6281231773663?text=Halo%2C%20saya%20membaca%20artikel%20di%20blog%20dan%20ingin%20tanya%20produk"
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Hubungi via WhatsApp
          </Link>
        </div>
      </article>
    </main>
  );
}