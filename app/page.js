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
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faq";
import { useCart } from "@/context/CartContext";
import FAQSection from "@/components/home/FAQSection";
import TestimonialSection from "@/components/home/TestimonialSection";

export default function Home() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20memesan%20oleh-oleh%20khas%20Magetan";

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(PRODUCTS.map((p) => p.category))];
    return ["Semua", ...uniqueCategories];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="bg-[#fcfdfa] min-h-screen pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-50/60 via-transparent to-transparent -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-8 bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.25em] text-gray-500 uppercase">
              Produk 3R — Oleh-oleh Khas Magetan
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight mb-6 text-gray-900">
            Oleh-oleh Khas Magetan
            <span className="block text-green-600">
              Asli, Tradisional, Siap Kirim
            </span>
          </h1>

          <p className="text-gray-500 text-base md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Temukan jajanan khas Magetan pilihan seperti rengginang, madu mongso,
            keripik tempe, lempeng puli, dan camilan tradisional favorit untuk
            keluarga, tamu, maupun hampers spesial.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} />
              Pesan via WhatsApp
            </a>

            <a
              href="#produk"
              className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300"
            >
              Lihat Produk
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <ShieldCheck size={18} className="text-green-600" />
              Produk pilihan & higienis
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <Truck size={18} className="text-green-600" />
              Siap kirim & mudah dipesan
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
              <BadgeCheck size={18} className="text-green-600" />
              Cocok untuk oleh-oleh & hampers
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-[-5%] w-[35%] h-[35%] bg-green-100/30 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-green-50/50 blur-[100px] rounded-full -z-10" />
      </section>

      {/* KEUNGGULAN */}
      <section className="max-w-7xl mx-auto px-6 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Jajanan Khas Pilihan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Produk dipilih dari camilan dan makanan khas Magetan yang cocok untuk
              oleh-oleh keluarga, tamu, maupun acara spesial.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Mudah Dipesan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bisa pilih produk langsung dari katalog, tambah ke keranjang, lalu
              lanjut pesan dengan alur yang lebih mudah dan jelas.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Cocok untuk Oleh-oleh
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Banyak pilihan produk tahan lama, cocok untuk perjalanan, hantaran,
              hampers, dan stok camilan di rumah.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER KATEGORI */}
      <section className="max-w-7xl mx-auto px-6 mb-10" id="produk">
        <div className="flex items-center gap-3 mb-5 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex bg-gray-100 p-1.5 rounded-[2rem] shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-white text-green-700 shadow-md"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID PRODUK */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <article
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              {product.tag && (
                <div
                  className={`absolute top-4 left-4 z-10 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-md ${
                    product.tag === "Terlaris"
                      ? "bg-orange-500 text-white"
                      : product.tag === "Favorit"
                      ? "bg-green-600 text-white"
                      : "bg-black/75 text-white"
                  }`}
                >
                  {product.tag}
                </div>
              )}

              <Link
                href={`/produk/${product.slug}`}
                className="block relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="p-6">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <Link
                    href={`/produk/${product.slug}`}
                    className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-center gap-1 text-orange-400 shrink-0">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-500">
                      {product.rating?.toFixed(1) || "5.0"}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 min-h-[44px]">
                  {product.shortDesc || product.description || product.desc}
                </p>

                <div className="flex items-center justify-between mt-5 mb-4 text-sm">
                  <span className="text-gray-500">Berat: {product.weight}</span>
                  <span className="font-semibold text-green-700">
                    {product.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-2xl font-black text-gray-900">
                    Rp{product.price.toLocaleString("id-ID")}
                  </span>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all active:scale-95"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/produk/${product.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800"
                  >
                    Lihat detail
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TestimonialSection />
      {/* FAQ */}
      <FAQSection />

      {/* CTA BAWAH */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="bg-gray-900 text-white rounded-[2rem] p-8 md:p-10 text-center shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-black mb-3">
            Siap pesan oleh-oleh khas Magetan?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Pilih produk favoritmu, masukkan ke keranjang, atau langsung hubungi kami
            via WhatsApp untuk tanya stok, pengiriman, dan pesanan hampers.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
          >
            <MessageCircle size={20} />
            Hubungi via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}