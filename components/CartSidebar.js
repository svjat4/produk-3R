"use client";
import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag, MessageSquare, AlertCircle } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

export default function CartSidebar({ isOpen, onClose }) {
  // Ambil data dan fungsi dari context
  const { cart, updateQty, removeFromCart, updateCartItem, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay Gelap dengan Blur */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[200] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-gray-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header Sidebar */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2.5 rounded-2xl text-green-600">
                <ShoppingBag size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-xl font-black text-gray-900 leading-none">Keranjang</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{totalItems} Item Terpilih</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-red-500"
            >
              <X size={24} />
            </button>
          </div>

          {/* List Produk */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200">
                  <ShoppingBag size={48} />
                </div>
                <p className="text-gray-900 font-black text-lg">Keranjang Kosong</p>
                <button onClick={onClose} className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all">
                  Lihat Produk
                </button>
              </div>
            ) : (
              cart.map((item) => (
                // Gunakan cartItemId sebagai key
                <div key={item.cartItemId} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex gap-4 group">
                    {/* Foto Produk */}
                    <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Detail Produk */}
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900 leading-tight group-hover:text-green-600 transition-colors">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{item.weight}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.cartItemId)} className="text-gray-300 hover:text-red-500 p-1 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* --- PILIHAN VARIAN --- */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter mb-1.5 flex items-center gap-1">
                            {item.selectedVariant ? "Varian Terpilih" : <><AlertCircle size={10} className="text-orange-500"/> Pilih Varian (Wajib)</>}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.variants.map((v) => (
                              <button
                                key={v}
                                onClick={() => updateCartItem(item.cartItemId, { selectedVariant: v })}
                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all border ${
                                  item.selectedVariant === v 
                                  ? "bg-green-600 border-green-600 text-white shadow-sm" 
                                  : "bg-white border-gray-100 text-gray-500 hover:border-green-200"
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* --- CATATAN PEMBELI --- */}
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <MessageSquare size={14} />
                    </div>
                    <textarea
                      placeholder="Contoh: Request kemasan hampers / Rasa pedas dikit..."
                      value={item.note || ""}
                      onChange={(e) => updateCartItem(item.cartItemId, { note: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-3 pl-9 text-xs focus:ring-1 focus:ring-green-500 focus:bg-white outline-none transition-all resize-none min-h-[60px]"
                    />
                  </div>

                  {/* Counter & Harga */}
                  <div className="flex items-center justify-between bg-gray-50/50 p-2 rounded-2xl border border-gray-50">
                    <div className="flex items-center border border-gray-100 bg-white rounded-xl p-1 shadow-sm">
                      <button onClick={() => updateQty(item.cartItemId, item.qty - 1)} className="w-7 h-7 flex items-center justify-center hover:text-green-600 transition-all">
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="w-8 text-center text-sm font-black text-gray-800">{item.qty}</span>
                      <button onClick={() => updateQty(item.cartItemId, item.qty + 1)} className="w-7 h-7 flex items-center justify-center hover:text-green-600 transition-all">
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                    
                    {/* Harga Per Item: Menggunakan item.price agar tetap 14k meski varian beda */}
                    <div className="text-right">
                      <span className="font-black text-gray-900 text-base">
                        Rp{(item.price * item.qty).toLocaleString()}
                      </span>
                      {/* Tanda opsional jika harga varian berbeda dengan harga tampilan */}
                      {item.actualPrice !== item.price && (
                        <p className="text-[8px] text-gray-400 font-bold italic -mt-1">
                          *Penyesuaian harga varian
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-b border-gray-100/50 pt-2" />
                </div>
              ))
            )}
          </div>

          {/* Footer Sidebar */}
          {cart.length > 0 && (
            <div className="p-8 bg-white border-t border-gray-100 rounded-t-[3rem] shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
              {/* Pesan Validasi */}
              {cart.some(item => item.variants && !item.selectedVariant) && (
                <div className="mb-4 bg-orange-50 p-3 rounded-xl flex items-center gap-3 border border-orange-100">
                  <AlertCircle size={18} className="text-orange-500 shrink-0" />
                  <p className="text-[11px] font-bold text-orange-700 leading-tight">
                    Pilih varian rasa untuk semua produk sebelum checkout.
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 font-bold">Total Pembayaran</span>
                  <span className="text-3xl font-black text-green-600 leading-none">
                    {/* Total tetap akurat menggunakan actualPrice dari Context */}
                    Rp{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Disable Button jika varian belum lengkap */}
              <div className={cart.some(item => item.variants && !item.selectedVariant) ? "opacity-50 pointer-events-none grayscale" : ""}>
                <WhatsAppButton variant="checkout" />
              </div>
              
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter text-center mt-6">
                📦 Produk dikirim langsung dari Magetan
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}