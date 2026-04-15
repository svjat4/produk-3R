"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "magetan_cart";
const ADMIN_WA = "6281231773663";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart dari localStorage saat pertama kali render di client
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Gagal memuat keranjang:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Simpan cart ke localStorage setelah data siap
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, isInitialized]);

  const addToCart = (product, selectedVariant = null) => {
    setCart((prevCart) => {
      const variantPrice =
        product.variantPrices && selectedVariant && product.variantPrices[selectedVariant]
          ? product.variantPrices[selectedVariant]
          : product.price;

      const cartItemId = selectedVariant
        ? `${product.id}-${selectedVariant.replace(/\s+/g, "-").toLowerCase()}`
        : product.id;

      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          actualPrice: variantPrice,
          price: product.price,
          qty: 1,
          note: "",
          selectedVariant,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, qty: newQty } : item
      )
    );
  };

  const updateCartItem = (cartItemId, updates) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId !== cartItemId) return item;

        const newVariant = updates.selectedVariant ?? item.selectedVariant;

        const newActualPrice =
          item.variantPrices && newVariant && item.variantPrices[newVariant]
            ? item.variantPrices[newVariant]
            : item.price;

        return {
          ...item,
          ...updates,
          selectedVariant: newVariant,
          actualPrice: newActualPrice,
        };
      })
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.actualPrice * item.qty, 0),
    [cart]
  );

  const checkoutWA = () => {
    if (cart.length === 0) return;

    const listBelanja = cart
      .map((item, index) => {
        const variantText = item.selectedVariant
          ? `\n   - Varian: ${item.selectedVariant}`
          : "";

        const noteText = item.note ? `\n   - Catatan: ${item.note}` : "";

        return `${index + 1}. ${item.name} (${item.qty}x)${variantText}${noteText}\n   Harga: Rp${(
          item.actualPrice * item.qty
        ).toLocaleString("id-ID")}`;
      })
      .join("\n\n");

    const pesan = `*INFO PESANAN - PRODUK 3R MAGETAN*
--------------------------------------------
Halo Admin, saya ingin memesan:

${listBelanja}

--------------------------------------------
*Total Pembayaran: Rp${totalPrice.toLocaleString("id-ID")}*

Mohon informasi ketersediaan stok dan ongkir ya min. Terima kasih!`;

    const encodedMessage = encodeURIComponent(pesan);
    window.open(`https://wa.me/${ADMIN_WA}?text=${encodedMessage}`, "_blank");
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    updateCartItem,
    clearCart,
    totalItems,
    totalPrice,
    checkoutWA,
    isInitialized,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }

  return context;
}