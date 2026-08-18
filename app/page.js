"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Star,
  ArrowRight,
  Plus,
  ShieldCheck,
  Truck,
  BadgeCheck,
  MessageCircle,
  BookOpen,
  Clock,
  Check,
  Sparkles,
  MapPin,
  Users,
  Award,
  ChevronRight,
  Store,
  Phone,
  PackageCheck,
  HelpCircle,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faq";
import { blogPosts } from "@/data/blog";
import { useCart } from "@/context/CartContext";
import FAQSection from "@/components/home/FAQSection";
import TestimonialSection from "@/components/home/TestimonialSection";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export default function Home() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [addedId, setAddedId] = useState(null);

  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20memesan%20oleh-oleh%20khas%20Magetan%20dari%20Produk%203R";

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // Ambil 3 artikel terbaru dengan pengaman jika blogPosts kosong/undefined
  const latestBlogs = useMemo(() => {
    if (!blogPosts || !Array.isArray(blogPosts)) return [];
    return blogPosts.slice(0, 3);
  }, []);

  // Buat kategori unik dengan pengaman
  const categories = useMemo(() => {
    if (!PRODUCTS || !Array.isArray(PRODUCTS)) return ["Semua"];
    const uniqueCategories = [...new Set(PRODUCTS.map((p) => p.category).filter(Boolean))];
    return ["Semua", ...uniqueCategories];
  }, []);

  // Filter & sort produk
  const filteredAndSortedProducts = useMemo(() => {
    if (!PRODUCTS || !Array.isArray(PRODUCTS)) return [];
    
    const tagPriority = {
      Terlaris: 1,
      Favorit: 2,
      Baru: 3,
      Tradisional: 4,
      Pedas: 5,
      Default: 6,
    };

    const list =
      activeCategory === "Semua"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory);

    return [...list].sort((a, b) => {
      const priorityA = tagPriority[a.tag] || tagPriority.Default;
      const priorityB = tagPriority[b.tag] || tagPriority.Default;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (b.rating || 0) - (a.rating || 0);
    });
  }, [activeCategory]);

  // JSON-LD Schema (Sudah diperbaiki syntax error-nya)
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Produk 3R — Pusat Oleh-oleh Khas Magetan",
        description: "Pusat Grosir & Eceran Makanan Tradisional Khas Magetan Jawa Timur",
        inLanguage: "id-ID",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#organization`,
        name: "Produk 3R - Pusat Oleh-oleh Khas Magetan",
        url: SITE_URL,
        telephone: "+6281231773663",
        priceRange: "Rp10.000 - Rp100.000",
        image: `${SITE_URL}/og-image.jpg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Magetan",
          addressRegion: "Jawa Timur",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -7.6521,
          longitude: 111.3263,
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "21:00",
        },
        areaServed: [
          "Magetan",
          "Maospati",
          "Plaosan",
          "Telaga Sarangan",
          "Jawa Timur",
          "Indonesia",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Pusat Grosir Oleh-oleh & Snack Khas Magetan | Produk 3R",
        description:
          "Produsen dan distributor resmi makanan tradisional khas Magetan Jawa Timur: Rengginang, Madu Mongso, Lempeng Puli, Keripik Tempe, dan Sambel Kacang.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@type": "Thing", name: "Oleh-oleh Khas Magetan" },
          { "@type": "Thing", name: "Jajanan Tradisional Jawa Timur" },
          { "@type": "Thing", name: "Kuliner Magetan" },
          { "@type": "Thing", name: "Rengginang Ketan Magetan" },
        ],
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
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: (FAQS || []).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-products`,
        name: "Produk Unggulan Oleh-oleh Khas Magetan",
        numberOfItems: (PRODUCTS || []).length,
        itemListElement: (PRODUCTS || []).slice(0, 8).map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            image: product.image?.startsWith("http")
              ? product.image
              : `${SITE_URL}${product.image || ""}`,
            description: product.shortDesc || product.description || "",
            offers: {
              "@type": "Offer",
              priceCurrency: "IDR",
              price: product.price || 0,
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/produk/${product.slug || ""}`,
            },
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-slate-50/60 min-h-screen pb-24 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent -z-10" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg shadow-slate-900/10 text-xs font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Sparkles size={14} className="text-amber-300" />
            <span>Pusat Oleh-oleh Khas Magetan — Produk 3R</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] mb-6 text-slate-900">
            Cita Rasa Asli <span className="text-green-600">Magetan</span>,<br />
            Dikirim Langsung ke Rumah Anda.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Nikmati aneka rengginang gurih, madu mongso manis, lempeng puli beras, dan keripik tempe renyah buatan pengrajin lokal Magetan. Kualitas terjamin, tanpa pengawet, siap grosir maupun eceran.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-green-600/25 flex items-center justify-center gap-2.5 text-sm sm:text-base active:scale-95"
            >
              <MessageCircle size={20} />
              <span>Pesan via WhatsApp</span>
            </a>

            <a
              href="#produk"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200/80 text-slate-900 border border-slate-200/80 px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span>Eksplor Katalog</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-slate-100">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <ShieldCheck size={18} className="text-green-600 shrink-0" />
              <span>100% Bahan Alami</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Truck size={18} className="text-green-600 shrink-0" />
              <span>Kirim Seluruh Indonesia</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Award size={18} className="text-green-600 shrink-0" />
              <span>Garansi Renyah & Fresh</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
              <Users size={18} className="text-green-600 shrink-0" />
              <span>Melayani Grosir & Reseller</span>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 text-center border border-slate-800">
          <div>
            <span className="block text-2xl md:text-3xl font-black text-green-400">10.000+</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">Paket Terkirim</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-black text-green-400">100%</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">Resep Asli Magetan</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-black text-green-400">150+</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">Agen & Reseller</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-black text-green-400">4.9/5.0</span>
            <span className="text-xs sm:text-sm text-slate-400 font-medium">Rating Kepuasan</span>
          </div>
        </div>
      </section>

      {/* KATALOG PRODUK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16" id="produk">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full">
              Katalog Produk 3R
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Jajanan Khas Magetan Pilihan
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  {product.tag && (
                    <span
                      className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        product.tag === "Terlaris"
                          ? "bg-amber-500 text-white"
                          : product.tag === "Favorit"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900/80 text-white backdrop-blur-md"
                      }`}
                    >
                      {product.tag}
                    </span>
                  )}

                  <Link href={`/produk/${product.slug}`} className="block w-full h-full">
                    <Image
                      src={product.image || "/placeholder.jpg"}
                      alt={product.imageAlt || product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                      {product.category || "Umum"}
                    </span>

                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star size={13} fill="currentColor" />
                      <span className="text-slate-700">{product.rating?.toFixed(1) || "5.0"}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors leading-snug line-clamp-1">
                    <Link href={`/produk/${product.slug}`}>{product.name}</Link>
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed min-h-[32px]">
                    {product.shortDesc || product.description || product.desc}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <span>Berat: <strong className="text-slate-700">{product.weight || "-"}</strong></span>
                    <span className="text-emerald-600 font-semibold">{product.status || "Ready"}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Harga
                  </span>
                  <span className="text-lg font-black text-slate-900">
                    Rp{(product.price || 0).toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                    addedId === product.id
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 hover:bg-green-600 text-white"
                  }`}
                  aria-label={`Tambah ${product.name} ke keranjang`}
                >
                  {addedId === product.id ? (
                    <>
                      <Check size={16} />
                      <span>Masuk</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Beli</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm"
          >
            <span>Lihat Seluruh Katalog Produk ({(PRODUCTS || []).length})</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ARTIKEL TERBARU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <BookOpen size={14} />
              <span>Edukasi & Wawasan Kuliner</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Artikel & Panduan Terbaru
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            <span>Baca Semua Artikel</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBlogs.map((blog) => (
            <article
              key={blog.id || blog.slug}
              className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  {blog.category && (
                    <div className="absolute top-3 left-3 z-10 bg-slate-900/80 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      {blog.category}
                    </div>
                  )}

                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-800 to-slate-900 flex items-center justify-center p-6 text-white text-center font-bold text-sm">
                      {blog.title}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    {blog.date && <span>{blog.date}</span>}
                    {blog.date && blog.readTime && <span>•</span>}
                    {blog.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {blog.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug mb-2">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt || blog.description || blog.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LOCAL ENTITY KNOWLEDGE BASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm text-slate-700">
          <div className="flex items-center gap-2 text-green-700 text-xs font-bold uppercase tracking-wider mb-2">
            <MapPin size={16} />
            <span>Pusat Entitas Kuliner Magetan, Jawa Timur</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Pusat Grosir & Distributor Oleh-Oleh Khas Magetan Resmi (Produk 3R)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed text-slate-600 mb-8">
            <div>
              <p className="mb-4">
                Selamat datang di <strong>Produk 3R (JajananMagetan.biz.id)</strong>, produsen dan mitra resmi distributor camilan tradisional khas Kabupaten Magetan. Kami memproduksi dan menyalurkan aneka makanan khas pilihan asli dari sentra UMKM lokal Magetan, meliputi area Kecamatan Magetan, Maospati, Plaosan, Karangrejo, hingga kawasan wisata Telaga Sarangan.
              </p>
              <p>
                Setiap produk dibuat menggunakan resep warisan turun-temurun dengan bahan beras ketan asli, tempe pilihan, dan bumbu rempah alami tanpa bahan pengawet berbahaya. Cocok untuk hidangan keluarga, hajatan, suvenir acara, maupun stok grosir toko Anda.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-3 flex items-center gap-2">
                <Store size={18} className="text-green-600" />
                <span>Kenapa Produk 3R Menjadi Pilihan Utama?</span>
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Harga Tangan Pertama:</strong> Langsung dari produsen tanpa perantara.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Layanan Reseller & Agen:</strong> Paket kemasan bal-balan untuk toko souvenir & snack.</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Pengiriman Aman:</strong> Packing dus tebal + bubble wrap rapi untuk ekspedisi luar kota.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 rounded-2xl p-6 border border-slate-800">
            <h3 className="text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
              <PackageCheck size={18} className="text-green-400" />
              <span>Ringkasan Layanan & Informasi Toko (Fakta Produk 3R)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 text-[11px] mb-1">Produk Utama</span>
                <span className="font-semibold text-white">Rengginang Ketan, Madu Mongso, Lempeng Puli, Keripik Tempe</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 text-[11px] mb-1">Lokasi Produksi</span>
                <span className="font-semibold text-white">Kabupaten Magetan, Jawa Timur, Indonesia</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 text-[11px] mb-1">Layanan Pemesanan</span>
                <span className="font-semibold text-white">Eceran, Grosir, Reseller, & Suvenir Acara</span>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <span className="block text-slate-400 text-[11px] mb-1">Kontak Resmi WhatsApp</span>
                <span className="font-semibold text-green-400">+62 812-3177-3663</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL & FAQ */}
      <TestimonialSection />
      <FAQSection faqs={FAQS} />

      {/* BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-green-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Siap Kirim Hari Ini
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight mb-3">
              Pesan Oleh-oleh Khas Magetan Sekarang
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Pilih produk melalui katalog web atau langsung konsultasikan kebutuhan hampers dan grosir Anda via WhatsApp kami. Response cepat dan ramah!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <MessageCircle size={18} />
              <span>Chat WhatsApp Langsung</span>
            </a>
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all border border-slate-700"
            >
              <span>Lihat Katalog</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}