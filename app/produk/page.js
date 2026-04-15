"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  MessageCircle,
  Plus,
  Star,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProdukPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20oleh-oleh%20khas%20Magetan";

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(PRODUCTS.map((item) => item.category))];
    return ["Semua", ...uniqueCategories];
  }, []);

  const filteredProducts = useMemo(() => {
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
        : PRODUCTS.filter((item) => item.category === activeCategory);

    return [...list].sort((a, b) => {
      const priorityA = tagPriority[a.tag] || tagPriority.Default;
      const priorityB = tagPriority[b.tag] || tagPriority.Default;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (b.rating || 0) - (a.rating || 0);
    });
  }, [activeCategory]);

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Terlaris":
        return "bg-orange-500 text-white";
      case "Favorit":
        return "bg-green-600 text-white";
      case "Baru":
        return "bg-blue-600 text-white";
      case "Tradisional":
        return "bg-emerald-600 text-white";
      case "Pedas":
        return "bg-red-600 text-white";
      default:
        return "bg-black/75 text-white";
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfdfa] pb-20">
      <section className="border-b border-gray-100 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="hover:text-green-700 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium text-gray-900">Produk</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
              Katalog Produk
            </span>

            <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
              Semua Produk
              <span className="block text-green-600">
                Oleh-oleh Khas Magetan
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
              Jelajahi katalog pilihan jajanan dan makanan khas Magetan untuk
              oleh-oleh, hampers, dan stok camilan di rumah.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan{" "}
              <span className="font-bold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              produk
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all"
            >
              <MessageCircle size={18} />
              Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex bg-gray-100 p-1.5 rounded-[2rem] shadow-inner min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-white text-green-700 shadow-md"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-[2rem] p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Produk belum tersedia
            </h2>
            <p className="text-gray-600">
              Belum ada produk untuk kategori ini. Coba pilih kategori lain.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(0,0,0,0.12)]"
              >
                {product.tag && (
                  <div
                    className={`absolute top-4 left-4 z-10 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider shadow-md ${getTagStyle(
                      product.tag
                    )}`}
                  >
                    {product.tag}
                  </div>
                )}

                <Link
                  href={`/produk/${product.slug}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-gray-50"
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </Link>

                <div className="p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-green-700">
                        {product.category}
                      </p>
                      <Link
                        href={`/produk/${product.slug}`}
                        className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-green-600"
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="shrink-0 rounded-xl bg-gray-50 px-2 py-1">
                      <div className="flex items-center gap-1 text-orange-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold text-gray-600">
                          {product.rating?.toFixed(1) || "5.0"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="min-h-[44px] text-sm leading-relaxed text-gray-500 line-clamp-2">
                    {product.shortDesc || product.description || product.desc}
                  </p>

                  <div className="mt-5 mb-5 flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Berat:{" "}
                      <span className="font-semibold text-gray-700">
                        {product.weight}
                      </span>
                    </span>
                    <span className="font-semibold text-green-700">
                      {product.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                        Harga
                      </p>
                      <span className="text-2xl font-black text-gray-900">
                        Rp{product.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white transition-all hover:bg-green-600 active:scale-95"
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
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="overflow-hidden rounded-[2.5rem] bg-gray-900 px-8 py-10 text-center text-white shadow-2xl md:px-12 md:py-14">
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            Mau pesan atau tanya stok?
          </h2>
          <p className="mx-auto mb-7 max-w-2xl text-gray-300 leading-relaxed">
            Pilih produk favoritmu lalu hubungi kami untuk konfirmasi stok,
            pengiriman, dan pesanan hampers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition-all hover:bg-green-700"
            >
              <MessageCircle size={20} />
              Hubungi via WhatsApp
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-gray-900 transition-all hover:bg-gray-100"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}