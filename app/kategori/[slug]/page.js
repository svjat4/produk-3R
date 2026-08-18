import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  MapPin,
  ShieldCheck,
  Truck,
  Sparkles,
  Package,
  MessageCircle,
  Store,
  CheckCircle2,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import CategoryProductsClient from "@/components/CategoryProductsClient";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan | Produk 3R Magetan",
      description: "Halaman kategori produk oleh-oleh khas Magetan tidak ditemukan.",
    };
  }

  const metaTitle = `${category.title} — Oleh-Oleh Khas Magetan | Produk 3R`;
  const metaDesc = `${category.description} Pesan grosir & eceran produk ${category.name} asli dari sentra UMKM Magetan, Jawa Timur. Garansi fresh, kirim seluruh Indonesia.`;

  return {
    title: metaTitle,
    description: metaDesc,
    keywords: [
      category.name,
      `jual ${category.name} magetan`,
      `oleh oleh khas magetan ${category.name}`,
      "kuliner khas magetan",
      "produk 3R magetan",
      "grosir snack magetan",
    ],
    alternates: {
      canonical: `${SITE_URL}/kategori/${category.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `${SITE_URL}/kategori/${category.slug}`,
      siteName: "Produk 3R Magetan",
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
    },
  };
}

export default async function KategoriPage({ params }) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((product) =>
    category.matchCategories?.includes(product.category)
  );

  const whatsappUrl = `https://wa.me/6281231773663?text=Halo%20Produk%203R%2C%20saya%20tertarik%20dengan%20kategori%20${encodeURIComponent(
    category.name
  )}%20dan%20ingin%20tanya%20stok%2Fgrosir`;

  // Schema.org JSON-LD (CollectionPage + ItemList + BreadcrumbList + GEO Place)
  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/kategori/${category.slug}/#webpage`,
        url: `${SITE_URL}/kategori/${category.slug}`,
        name: category.title,
        description: category.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: category.name,
              item: `${SITE_URL}/kategori/${category.slug}`,
            },
          ],
        },
        spatialCoverage: {
          "@type": "Place",
          name: "Magetan, Jawa Timur, Indonesia",
          geo: {
            "@type": "GeoCoordinates",
            latitude: -7.6521,
            longitude: 111.3263,
          },
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/kategori/${category.slug}/#itemlist`,
        name: `Katalog ${category.name}`,
        numberOfItems: categoryProducts.length,
        itemListElement: categoryProducts.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.image.startsWith("http")
              ? product.image
              : `${SITE_URL}${product.image}`,
            description: product.shortDesc || product.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "IDR",
              price: product.price,
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/produk/${product.slug}`,
            },
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-24 text-slate-900">
      {/* Schema.org Ingestion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-slate-200/80 pt-10 pb-12 md:pt-16 md:pb-20 overflow-hidden">
        {/* Glow Decor Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium"
          >
            <Link
              href="/"
              className="hover:text-green-700 transition-colors flex items-center gap-1"
            >
              Beranda
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-400">Kategori</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {category.name}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              {/* Badge GEO Entity */}
              <div className="inline-flex items-center gap-2 mb-4 bg-green-50 border border-green-200/70 text-green-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <MapPin size={14} className="text-green-600" />
                <span>Sentra Khas Magetan — Produk 3R</span>
                <Sparkles size={14} className="text-amber-500" />
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
                {category.title}
              </h1>

              <p className="mt-4 text-slate-600 text-sm sm:text-lg leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Switcher Quick Link Kategori Lain */}
            <div className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Jelajahi Kategori Lain
              </span>
              <div className="flex flex-wrap gap-1.5 max-w-xs">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/kategori/${cat.slug}`}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      cat.slug === slug
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-slate-100 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Package size={18} className="text-green-600 shrink-0" />
              <span>{categoryProducts.length} Varian Tersedia</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <ShieldCheck size={18} className="text-green-600 shrink-0" />
              <span>100% Olahan Magetan</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Truck size={18} className="text-green-600 shrink-0" />
              <span>Siap Kirim Luar Kota</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Store size={18} className="text-green-600 shrink-0" />
              <span>Harga Tangan Pertama</span>
            </div>
          </div>
        </div>
      </section>

      {/* KATALOG CLIENT COMPONENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <CategoryProductsClient
          products={categoryProducts}
          categoryName={category.name}
        />
      </section>

      {/* LOCAL ENTITY TRUST BLOCK (GEO SEO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs text-slate-700">
          <div className="flex items-center gap-2 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin size={16} />
            <span>Kualitas Terjamin dari Magetan</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
            Mengapa Memilih {category.name} dari Produk 3R Magetan?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm leading-relaxed text-slate-600 mt-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Bahan Baku Lokal Pilihan
              </h3>
              <p>
                Diproduksi langsung menggunakan bahan alami berkualitas dari petani lokal Kabupaten Magetan tanpa bahan pengawet sintesis.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Produksi Setiap Hari (Fresh)
              </h3>
              <p>
                Jaminan produk tetap renyah dan gurih karena selalu diproses baru sebelum dikemas dan dikirimkan ke alamat tujuan Anda.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Melayani Grosir & Bal-Balan
              </h3>
              <p>
                Menerima pemesanan skala partai besar untuk reseller, toko pusat oleh-oleh, maupun hampers acara keluarga dan instansi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400 uppercase tracking-wider mb-2">
              <CheckCircle2 size={15} />
              <span>Pusat Layanan Pelanggan</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Butuh Penawaran Khusus / Pesanan Banyak?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Konsultasikan kebutuhan varian {category.name} Anda secara langsung via WhatsApp.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-7 rounded-2xl text-xs sm:text-sm transition-all shadow-md shrink-0 active:scale-95"
          >
            <MessageCircle size={18} />
            <span>Tanya Stok & Grosir Kategori Ini</span>
          </a>
        </div>
      </section>
    </main>
  );
}