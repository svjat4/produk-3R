import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
// Import data dari file programmatic.js
import { programmaticData } from '@/data/programmatic';

// 1. Generate Static Params untuk SEO Crawling
export async function generateStaticParams() {
  return programmaticData.map((item) => ({
    slug: item.slug,
  }));
}

// 2. Metadata Dinamis untuk SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = programmaticData.find((p) => p.slug === slug);
  
  if (!item) return { title: 'Produk Tidak Ditemukan' };

  return {
    title: `${item.title} | Produk 3R Magetan`,
    description: item.description,
  };
}

// 3. Main Component
export default async function ProgrammaticPage({ params }) {
  const { slug } = await params;
  const item = programmaticData.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  // Schema Markup untuk Produk
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": item.title,
    "description": item.description,
    "brand": {
      "@type": "Organization",
      "name": "Produk 3R Magetan"
    }
  };

  return (
    <main className="bg-[#fcfdfa] min-h-screen py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali ke Beranda
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
            {item.title}
          </h1>
        </header>

        {/* Content (Rendering HTML dari Data) */}
        <div 
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />

        {/* CTA */}
        <div className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ingin Memesan?</h3>
          <Link 
            href="https://wa.me/6281231773663"
            target="_blank"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Pesan Via WhatsApp
          </Link>
        </div>
      </article>
    </main>
  );
}