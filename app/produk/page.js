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
  Search,
  SlidersHorizontal,
  Sparkles,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  X,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export default function ProdukPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [addedId, setAddedId] = useState(null);

  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20oleh-oleh%20khas%20Magetan";

  // Hitung jumlah item per kategori
  const categories = useMemo(() => {
    const counts = PRODUCTS.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const uniqueCategories = Object.keys(counts).map((cat) => ({
      name: cat,
      count: counts[cat],
    }));

    return [
      { name: "Semua", count: PRODUCTS.length },
      ...uniqueCategories,
    ];
  }, []);

  // Filter & Sorting logic
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    if (activeCategory !== "Semua") {
      list = list.filter((item) => item.category === activeCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.shortDesc && item.shortDesc.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q))
      );
    }

    const tagPriority = {
      Terlaris: 1,
      Favorit: 2,
      Baru: 3,
      Tradisional: 4,
      Pedas: 5,
      Default: 6,
    };

    return [...list].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);

      // Default priority
      const priorityA = tagPriority[a.tag] || tagPriority.Default;
      const priorityB = tagPriority[b.tag] || tagPriority.Default;
      if (priorityA !== priorityB) return priorityA - priorityB;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [activeCategory, searchQuery, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Terlaris":
        return "bg-amber-500/90 text-white backdrop-blur-md";
      case "Favorit":
        return "bg-emerald-600/90 text-white backdrop-blur-md";
      case "Baru":
        return "bg-blue-600/90 text-white backdrop-blur-md";
      case "Tradisional":
        return "bg-teal-600/90 text-white backdrop-blur-md";
      case "Pedas":
        return "bg-rose-600/90 text-white backdrop-blur-md";
      default:
        return "bg-slate-900/80 text-white backdrop-blur-md";
    }
  };

  // Schema Org untuk ItemList Product (SEO)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Katalog Produk Oleh-oleh Khas Magetan - Produk 3R",
    url: `${SITE_URL}/produk`,
    numberOfItems: filteredProducts.length,
    itemListElement: filteredProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        image: product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`,
        description: product.shortDesc || product.description || product.name,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/produk/${product.slug}`,
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50/60 pb-20">
      {/* SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* HERO SECTION */}
      <section className="border-b border-slate-200/80 bg-white pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/" className="hover:text-green-600 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <ChevronRight size={14} className="text-slate-400" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900">
                Katalog Produk
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200/80 rounded-full text-green-700 text-xs font-semibold tracking-wide mb-3">
                <Sparkles size={14} />
                <span>Garansi 100% Cita Rasa Asli Magetan</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Katalog Jajanan & <br className="hidden sm:inline" />
                <span className="text-green-600">Oleh-oleh Khas Magetan</span>
              </h1>

              <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
                Temukan aneka keripik, renyah lempeng puli, madu mongso, dan camilan tradisional berkualitas siap kirim ke seluruh Indonesia.
              </p>
            </div>

            {/* Feature Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t lg:border-t-0 border-slate-100">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <ShieldCheck size={18} className="text-green-600 shrink-0" />
                <span>Tanpa Pengawet</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                <Truck size={18} className="text-green-600 shrink-0" />
                <span>Packing Safe</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 col-span-2 sm:col-span-1">
                <RotateCcw size={18} className="text-green-600 shrink-0" />
                <span>Garansi Renyah</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH, FILTER & SORT BAR (STICKY) */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Live Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari rengginang, madu mongso, keripik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 bg-slate-100/80 border border-slate-200 focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/20 rounded-xl text-xs sm:text-sm transition-all text-slate-900 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Chips Scrollable */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  activeCategory === cat.name
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.name
                      ? "bg-slate-700 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center justify-between md:justify-end gap-2 text-xs border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
            <span className="text-slate-500 whitespace-nowrap flex items-center gap-1">
              <SlidersHorizontal size={14} />
              Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-600/20 cursor-pointer"
            >
              <option value="recommended">Rekomendasi</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-low">Harga: Terendah</option>
              <option value="price-high">Harga: Tertinggi</option>
            </select>
          </div>

        </div>
      </section>

      {/* PRODUCT GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <span>
            Menampilkan <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> produk khas
          </span>
          {searchQuery && (
            <span>
              Kata kunci: <strong className="text-green-600">"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search size={28} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Produk Tidak Ditemukan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              Maaf, kami tidak menemukan produk yang cocok. Coba atur ulang kata kunci atau filter kategori Anda.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("Semua");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    {product.tag && (
                      <span
                        className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${getTagStyle(
                          product.tag
                        )}`}
                      >
                        {product.tag}
                      </span>
                    )}

                    <Link href={`/produk/${product.slug}`} className="block w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.imageAlt || product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                        {product.category}
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
                      <span>Berat: <strong className="text-slate-700">{product.weight}</strong></span>
                      <span className="text-emerald-600 font-semibold">{product.status}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-3">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Harga
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      Rp{product.price.toLocaleString("id-ID")}
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
        )}
      </section>

      {/* SAAS SUPPORT / BULK BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-green-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Pesan Khusus & Hampers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-3">
              Butuh Pesanan Grosir atau Paket Hampers Acara?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Kami melayani pengadaan oleh-oleh untuk event, hajatan, souvenir pernikahan, dan paket reseller harga pabrik.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-7 rounded-full text-xs sm:text-sm transition-all shadow-md"
            >
              <MessageCircle size={18} />
              <span>Konsultasi WhatsApp</span>
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-7 rounded-full text-xs sm:text-sm transition-all border border-slate-700"
            >
              <span>Info Reseller</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}