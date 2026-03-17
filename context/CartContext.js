"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load data dari LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('magetan_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Gagal memuat keranjang:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Simpan ke LocalStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('magetan_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  /**
   * TAMBAH PRODUK
   * Logic: ID + Varian = Unik. 
   * Menyimpan actualPrice untuk kalkulasi, tapi mempertahankan base price untuk tampilan.
   */
  const addToCart = (product, selectedVariant = null) => {
    setCart((prevCart) => {
      // Tentukan harga asli berdasarkan varian (untuk total bayar)
      const variantPrice = (product.variantPrices && selectedVariant) 
        ? product.variantPrices[selectedVariant] 
        : product.price;

      // ID unik untuk membedakan baris di keranjang
      const cartItemId = selectedVariant 
        ? `${product.id}-${selectedVariant.replace(/\s+/g, '-').toLowerCase()}` 
        : product.id;

      const existingItem = prevCart.find((item) => item.cartItemId === cartItemId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [
        ...prevCart, 
        { 
          ...product, 
          cartItemId, 
          actualPrice: variantPrice, // Harga asli (misal: 15.000)
          price: product.price,      // Harga tampilan tetap (misal: 14.000)
          qty: 1, 
          note: "", 
          selectedVariant: selectedVariant 
        }
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQty = (cartItemId, newQty) => {
    if (newQty <= 0) return removeFromCart(cartItemId);
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartItemId === cartItemId ? { ...item, qty: newQty } : item))
    );
  };

  const updateCartItem = (cartItemId, updates) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId === cartItemId) {
          const newVarian = updates.selectedVariant || item.selectedVariant;
          // Update actualPrice jika varian berubah di sidebar
          const newActualPrice = (item.variantPrices && newVarian)
            ? item.variantPrices[newVarian]
            : item.price;

          return { ...item, ...updates, actualPrice: newActualPrice };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  
  // TOTAL HARGA menggunakan actualPrice agar akurat secara bisnis
  const totalPrice = cart.reduce((sum, item) => sum + item.actualPrice * item.qty, 0);

  // --- FUNGSI CHECKOUT WHATSAPP ---
  const checkoutWA = () => {
    if (cart.length === 0) return;

    const adminWA = "6281231773663"; 
    
    const listBelanja = cart
      .map((item, index) => {
        const variantStr = item.selectedVariant ? `%0A   └ Rasa: *${item.selectedVariant}*` : "";
        const noteStr = item.note ? `%0A   └ Catatan: _${item.note}_` : "";
        
        // WhatsApp tetap menggunakan actualPrice agar admin menerima uang yang benar
        return `${index + 1}. *${item.name}* (${item.qty}x)${variantStr}${noteStr}%0A   Harga: Rp${(item.actualPrice * item.qty).toLocaleString()}`;
      })
      .join("%0A%0A");

    const header = `*INFO PESANAN - PRODUK 3R MAGETAN*%0A--------------------------------------------%0A`;
    const footer = `%0A%0A--------------------------------------------%0A*Total Pembayaran: Rp${totalPrice.toLocaleString()}*%0A%0AMohon informasi ketersediaan stok & ongkir ya min. Terima kasih!`;

    const pesan = `${header}Halo Admin, saya ingin memesan:%0A%0A${listBelanja}${footer}`;

    window.open(`https://wa.me/${adminWA}?text=${pesan}`, "_blank");
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQty, 
      updateCartItem,
      clearCart, 
      totalItems, 
      totalPrice,
      checkoutWA 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);