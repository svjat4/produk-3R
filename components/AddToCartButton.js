"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.variants && product.variants.length > 0) {
      addToCart(product, product.variants[0]);
      return;
    }

    addToCart(product);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-3 hover:bg-green-700 transition-all"
    >
      <ShoppingCart size={20} />
      Tambah ke Keranjang
    </button>
  );
}