"use client";

import { useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

export default function FloatingCartBar() {
  const { totalItems, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (totalItems <= 0) return null;

  return (
    <>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

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
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">
                Total Pesanan
              </p>
              <p className="text-lg font-black text-white leading-tight font-mono">
                Rp{totalPrice.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl text-white">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </>
  );
}