import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { programmaticData } from '@/data/programmatic';

export async function generateStaticParams() {
  return programmaticData.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = programmaticData.find((p) => p.slug === slug);

  if (!item) {
    return {
      title: 'Produk Tidak Ditemukan',
    };
  }

  return {
    title: `${item.keyword} | Produk 3R Magetan`,
    description: `${item.keyword} terpercaya dari Produk 3R Magetan. Cocok untuk grosir, reseller, agen, dan kebutuhan oleh-oleh khas Magetan.`,
  };
}

export default async function ProgrammaticPage({ params }) {
  const { slug } = await params;
  const item = programmaticData.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  const title = item.keyword;

  const description = `${item.keyword} terpercaya dari Produk 3R Magetan untuk kebutuhan grosir, reseller, agen, dan oleh-oleh khas Magetan.`;

  const content = `
    <h2>${item.keyword}</h2>

    <p>
      Produk 3R Magetan menyediakan berbagai jajanan khas Magetan
      untuk kebutuhan ${item.intent.toLowerCase()}.
      Kami melayani pembelian dalam jumlah eceran maupun grosir.
    </p>

    <h3>Kenapa Memilih Produk 3R Magetan?</h3>

    <ul>
      <li>Produk jajanan khas Magetan.</li>
      <li>Cocok untuk reseller dan agen.</li>
      <li>Tersedia untuk kebutuhan grosir.</li>
      <li>Dapat digunakan sebagai oleh-oleh khas Magetan.</li>
      <li>Pemesanan mudah melalui WhatsApp.</li>
    </ul>

    <h3>Produk Jajanan Khas Magetan</h3>

    <p>
      Produk 3R menghadirkan berbagai pilihan jajanan khas Magetan
      yang dapat digunakan untuk kebutuhan pribadi, oleh-oleh,
      toko, reseller, maupun bisnis kuliner.
    </p>

    <h3>Pesan Sekarang</h3>

    <p>
      Jika Anda sedang mencari ${item.keyword.toLowerCase()},
      silakan hubungi Produk 3R Magetan melalui WhatsApp untuk
      mendapatkan informasi produk dan harga terbaru.
    </p>
  `;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description,
    brand: {
      '@type': 'Organization',
      name: 'Produk 3R Magetan',
    },
    url: `https://www.jajananmagetan.biz.id/p/${item.slug}`,
  };

  return (
    <main className="bg-[#fcfdfa] min-h-screen py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
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
            {title}
          </h1>

          <p className="text-gray-600 text-lg">
            {description}
          </p>
        </header>

        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />

        <div className="mt-12 p-8 bg-green-50 rounded-2xl border border-green-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Ingin Memesan?
          </h3>

          <p className="text-gray-600 mb-6">
            Hubungi Produk 3R Magetan untuk informasi produk,
            harga grosir, reseller, dan pemesanan.
          </p>

          <Link
            href="https://wa.me/6281231773663"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all"
          >
            Pesan Via WhatsApp
          </Link>
        </div>

      </article>
    </main>
  );
}