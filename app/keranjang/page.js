// app/keranjang/page.js
"use client";
import { useCart } from "@/context/CartContext";
import { Trash2, ArrowLeft, ShoppingBag, MessageSquare, AlertCircle, Minus, Plus, Tag } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton"; // Pastikan path import benar

export default function HalamanKeranjang() {
  const { cart, updateQty, removeFromCart, updateCartItem, totalPrice } = useCart();

  // Cek apakah ada varian yang belum dipilih
  const isVarianMissing = cart.some(item => item.variants && item.variants.length > 0 && !item.selectedVariant);

  return (
    <main className="relative min-h-screen bg-[#FCFCFC] px-6 py-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-50/50 blur-[100px] -z-10" />
      
      <div className="max-w-3xl mx-auto">
        {/* Navigasi Kembali */}
        <Link 
          href="/" 
          className="reveal inline-flex items-center gap-2 text-gray-400 mb-10 hover:text-green-600 transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Kembali Berbelanja
        </Link>

        <h1 className="reveal delay-1 text-4xl md:text-5xl font-black text-gray-900 mb-12 tracking-tighter">
          Keranjang <span className="text-green-600">Anda</span><span className="animate-pulse text-green-600">.</span>
        </h1>

        {cart.length > 0 ? (
          <div className="space-y-8">
            {/* List Produk */}
            <div className="reveal delay-2 bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              {cart.map((item) => (
                <div key={item.cartItemId} className="p-6 md:p-8 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Foto Produk */}
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Konten Detail */}
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 leading-tight">{item.name}</h4>
                          <p className="text-xs text-gray-400 font-bold uppercase mt-1 tracking-widest">{item.weight}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)} 
                          className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* --- PILIHAN VARIAN (SINKRON DENGAN SIDEBAR) --- */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                            {item.selectedVariant ? <><Tag size={12} className="text-green-600"/> Varian Terpilih</> : <><AlertCircle size={12} className="text-orange-500"/> Pilih Varian (Wajib)</>}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.variants.map((v) => (
                              <button
                                key={v}
                                onClick={() => updateCartItem(item.cartItemId, { selectedVariant: v })}
                                className={`px-4 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                                  item.selectedVariant === v 
                                  ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-100" 
                                  : "bg-white border-gray-200 text-gray-500 hover:border-green-300"
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* --- CATATAN PEMBELI --- */}
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-gray-300" size={16} />
                        <textarea
                          placeholder="Tambahkan catatan khusus (misal: bungkus kado, rasa pedas)..."
                          value={item.note || ""}
                          onChange={(e) => updateCartItem(item.cartItemId, { note: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-sm focus:ring-2 focus:ring-green-500/20 focus:bg-white outline-none transition-all resize-none min-h-[80px]"
                        />
                      </div>

                      {/* Counter & Harga */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-100 bg-white rounded-xl p-1.5 shadow-sm">
                          <button onClick={() => updateQty(item.cartItemId, item.qty - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-all">
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="w-10 text-center font-black text-gray-900">{item.qty}</span>
                          <button onClick={() => updateQty(item.cartItemId, item.qty + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-all">
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-gray-900 tracking-tighter">
                            Rp{(item.price * item.qty).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ringkasan & WhatsApp Button */}
            <div className="reveal delay-3 bg-white rounded-[32px] border border-gray-100 p-8 md:p-10 shadow-xl shadow-gray-100/50">
              {/* Alert jika varian belum dipilih */}
              {isVarianMissing && (
                <div className="mb-8 bg-orange-50 p-4 rounded-2xl flex items-center gap-3 border border-orange-100 animate-pulse">
                  <AlertCircle size={20} className="text-orange-500 shrink-0" />
                  <p className="text-sm font-bold text-orange-700">
                    Beberapa produk memerlukan pilihan varian sebelum Anda bisa memesan.
                  </p>
                </div>
              )}

              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-1">Total Belanja</p>
                  <p className="text-xs text-gray-300 font-medium">Lanjutkan ke WhatsApp untuk konfirmasi ongkir</p>
                </div>
                <span className="text-4xl font-black text-green-600 tracking-tighter leading-none">
                  Rp{totalPrice.toLocaleString()}
                </span>
              </div>
              
              {/* Gunakan WhatsAppButton yang sama agar logikanya identik */}
              <div className={isVarianMissing ? "opacity-50 pointer-events-none grayscale" : ""}>
                <WhatsAppButton variant="checkout" />
              </div>

              <p className="text-center text-[10px] text-gray-400 mt-8 font-bold uppercase tracking-[0.25em]">
                📦 Pengiriman Langsung Dari Magetan — Jawa Timur
              </p>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="reveal delay-2 text-center py-24 bg-white rounded-[40px] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-gray-300" size={32} />
            </div>
            <p className="text-gray-400 font-medium mb-8 text-lg">Keranjang belanja Anda masih kosong.</p>
            <Link href="/" className="inline-block bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg hover:-translate-y-1">
              Lihat Produk Kami
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}