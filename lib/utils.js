// lib/utils.js
export const formatWhatsAppMessage = (cart, totalPrice) => {
  const adminNumber = "628123456789"; // Ganti nomor aslimu
  
  let itemText = "";
  cart.forEach((item, index) => {
    itemText += `${index + 1}. *${item.name}* (${item.qty}x) = Rp${(item.price * item.qty).toLocaleString()}%0A`;
  });

  const message = `Halo Admin MampirMagetan,%0A%0ASaya ingin memesan oleh-oleh berikut:%0A%0A${itemText}%0A*Total: Rp${totalPrice.toLocaleString()}*%0A%0AMohon instruksi selanjutnya untuk pembayaran dan pengiriman. Terima kasih!`;

  return `https://wa.me/${adminNumber}?text=${message}`;
};