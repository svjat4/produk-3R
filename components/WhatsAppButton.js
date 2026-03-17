"use client";
import { MessageCircle, Send } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function WhatsAppButton({ variant = "floating" }) {
  const { checkoutWA, cart } = useCart();
  const phoneNumber = "6281231773663";
  const defaultMessage = "Halo Admin Produk 3R Magetan, saya ingin bertanya tentang produk oleh-olehnya...";

  // Fungsi untuk Chat Umum (Floating)
  const handleGeneralChat = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, "_blank");
  };

  // 1. Tampilan untuk di dalam CartSidebar (Full Button)
  if (variant === "checkout") {
    return (
      <button
        onClick={checkoutWA}
        className="w-full bg-[#25D366] text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-[#20ba59] transition-all shadow-xl shadow-green-100 active:scale-[0.98]"
      >
        <Send size={20} />
        PESAN SEKARANG (WA)
      </button>
    );
  }

  // 2. Tampilan Floating Button (Chat Umum)
  // Sembunyikan jika keranjang sedang ada isinya (opsional, agar tidak tumpuk dengan Floating Cart)
  if (cart.length > 0 && variant === "floating") return null;

  return (
    <button
      onClick={handleGeneralChat}
      className="fixed bottom-8 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Chat WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
      
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-widest font-bold shadow-xl">
        Tanya Admin
      </span>
    </button>
  );
}