"use client";
import { useState, useMemo } from "react";
import { ShoppingCart, Star, ArrowRight, X, Info, Plus } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext"; 
import CartSidebar from "@/components/CartSidebar";

export default function Home() {
  const { addToCart, totalPrice, totalItems } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 1. EKSTRAKSI KATEGORI OTOMATIS ---
  // Mengambil kategori unik langsung dari PRODUCTS agar tidak perlu update manual lagi
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(PRODUCTS.map((p) => p.category))];
    return ["Semua", ...uniqueCategories];
  }, []);

  // --- 2. LOGIKA PRIORITAS TAG & FILTERING ---
  const filteredAndSortedProducts = useMemo(() => {
    const tagPriority = {
      "Terlaris": 1,
      "Favorit": 2,
      "Baru": 3,
      "Pre-Order": 4,
      "Default": 5
    };

    // Filter berdasarkan kategori
    let list = activeCategory === "Semua" 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === activeCategory);

    // Sortir berdasarkan bobot Tag, kemudian berdasarkan Rating
    return [...list].sort((a, b) => {
      const priorityA = tagPriority[a.tag] || tagPriority["Default"];
      const priorityB = tagPriority[b.tag] || tagPriority["Default"];
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      // Jika tag sama, urutkan berdasarkan rating tertinggi
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [activeCategory]);

  return (
    <main className="bg-[#fcfdfa] min-h-screen pb-32">
      {/* Sidebar Keranjang */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Layer Background: Subtle Gradient untuk kedalaman visual */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-50/60 via-transparent to-transparent -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          
          {/* Label / Badge: Kecil namun meyakinkan */}
          <div className="reveal inline-flex items-center gap-2 mb-10 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.25em] text-gray-500 uppercase">
              Produk 3R — Asli Jajanan Magetan
            </span>
          </div>

          {/* Judul Utama: Font masif, Bold, dan Clean */}
          <h1 className="reveal delay-1 text-6xl md:text-[115px] font-black tracking-tighter leading-[0.85] mb-12 text-gray-900">
            
            {/* --- EFEK KEMERLAP PADA 'KEMURNIAN' --- */}
            <span className="relative inline-block group">
              {/* Teks dengan Efek Kilau Gradasi */}
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 bg-[length:200%_auto] animate-shine">
                Kemurnian
              </span>
              
              {/* Partikel Cahaya (Sparkle) di sekitar teks */}
              <span className="absolute -top-2 -right-4 w-2 h-2 bg-yellow-400 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity"></span>
              <span className="absolute -bottom-1 -left-2 w-1.5 h-1.5 bg-green-400 rounded-full blur-[1px] opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-300 transition-opacity"></span>
            </span>

            {/* Spasi & Teks Tradisi */}
            <span className="text-green-600 italic ml-2 md:ml-6 relative inline-block">
              Tradisi
              {/* Garis bawah tipis khas modern UI */}
              <span className="absolute bottom-4 left-0 w-full h-1.5 bg-green-100 -z-10 rounded-full"></span>
            </span>
            
            <br className="hidden md:block" />
            
            <span className="relative">
              Tanpa Kompromi
              <span className="text-green-600">.</span>
            </span>
          </h1>

          {/* Subtitle: Menggunakan font yang lebih ringan untuk keterbacaan (UX) */}
          <p className="reveal delay-2 text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed mb-14">
            Kurasi oleh-oleh legendaris yang diproses secara tradisional, menghadirkan kehangatan lereng Gunung Lawu langsung ke pintu rumah Anda.
          </p>

          {/* CTA Area: Mengarah ke Instagram */}
          <div className="reveal delay-3 flex flex-col items-center gap-8">
            <a 
              href="https://instagram.com/username_anda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-base hover:bg-green-600 transition-all duration-500 shadow-2xl shadow-gray-200 flex items-center justify-center gap-3 group active:scale-95"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Pesan via Instagram
            </a>
            
            {/* Social Proof Modern */}
            <div className="flex items-center gap-5 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-transform hover:scale-105">
              <div className="flex -space-x-3">
                {[
                  "https://i.pravatar.cc/100?u=1",
                  "https://i.pravatar.cc/100?u=2",
                  "https://i.pravatar.cc/100?u=8",
                  "https://i.pravatar.cc/100?u=4"
                ].map((url, i) => (
                  <img 
                    key={i} 
                    src={url} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-[10px] font-bold text-white">
                  +1k
                </div>
              </div>
              <div className="text-left border-l border-gray-100 pl-5">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3 h-3 text-orange-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-xs font-black text-gray-900 leading-none">1,240+ Pelanggan Puas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dekoratif abstrak (Soft Orbs) */}
        <div className="absolute top-1/4 left-[-5%] w-[35%] h-[35%] bg-green-100/30 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-green-50/50 blur-[100px] rounded-full -z-10" />
      </section>

      {/* --- KATEGORI FILTER (OTOMATIS) --- */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex bg-gray-100 p-1.5 rounded-[2rem] shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                  ? "bg-white text-green-700 shadow-md scale-105" 
                  : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRODUCT GRID --- */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <div 
              key={product.id}
              className="group relative bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2"
            >
              {/* Tag Badge */}
              {product.tag && (
                <div className={`absolute top-5 left-5 z-10 text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg ${
                  product.tag === 'Terlaris' ? 'bg-orange-500 text-white' : 
                  product.tag === 'Pre-Order' ? 'bg-blue-500 text-white' : 'bg-black/70 text-white'
                }`}>
                  {product.tag}
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden cursor-zoom-in" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                    <Info size={14} /> Detail
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-400">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-black text-gray-900">Rp{product.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all active:scale-90"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL DETAIL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-20 bg-gray-100 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all">
              <X size={20} />
            </button>
            <div className="w-full md:w-1/2">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
              <span className="text-green-600 font-bold text-[10px] uppercase tracking-widest mb-2 inline-block">Kategori: {selectedProduct.category}</span>
              <h2 className="text-4xl font-black text-gray-900 mb-4">{selectedProduct.name}</h2>
              <p className="text-gray-500 leading-relaxed mb-8">{selectedProduct.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Berat</p>
                  <p className="font-black text-gray-800">{selectedProduct.weight}</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-[2rem] border border-gray-100 text-center">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Status</p>
                  <p className="font-black text-green-600">{selectedProduct.status}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t">
                <span className="text-3xl font-black text-gray-900">Rp{selectedProduct.price.toLocaleString()}</span>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="bg-green-600 text-white px-8 py-5 rounded-[1.5rem] font-bold hover:bg-green-700 transition-all flex items-center gap-3"
                >
                  <Plus size={20} /> Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CART UI */}
      {totalItems > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[140] w-[92%] max-w-md animate-in slide-in-from-bottom-10">
          <div 
            onClick={() => setIsCartOpen(true)}
            className="bg-gray-900/95 backdrop-blur-xl border border-white/10 p-4 rounded-[2.5rem] flex items-center justify-between shadow-2xl cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-4 pl-2">
              <div className="relative w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-green-500 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-gray-900 text-white">
                  {totalItems}
                </span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Total Pesanan</p>
                <p className="text-lg font-black text-white leading-tight font-mono">Rp{totalPrice.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl text-white">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}