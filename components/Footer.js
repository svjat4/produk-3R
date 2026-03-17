"use client"; // Wajib di baris pertama
import { useState } from "react";
import { Instagram, Facebook, MessageCircle, MapPin, X, ChevronRight } from "lucide-react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data Cara Pemesanan
  const langkahPesan = [
    "Pilih produk favorit Anda di katalog.",
    "Klik tombol keranjang untuk memasukkan belanjaan.",
    "Buka menu keranjang di pojok kanan atas.",
    "Klik 'Pesan via WhatsApp'.",
    "Anda akan diarahkan ke chat admin untuk konfirmasi alamat dan pembayaran."
  ];

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 mt-20 rounded-t-[4rem] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Kolom 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black tracking-tighter mb-2">
              PRODUK 3R <span className="text-green-500">MAGETAN</span>
            </h2>
            <p className="text-gray-400 text-sm">Kurasi produk lokal berkelanjutan dari lereng Gunung Lawu.</p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all"><Instagram size={18} /></a>
               <a href="#" className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Menu Utama</h3>
            <ul className="space-y-3 text-gray-400 font-medium">
              <li><a href="/" className="hover:text-green-500 transition-colors">Beranda</a></li>
              {/* TOMBOL PEMICU MODAL */}
              <li>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-green-500 transition-colors focus:outline-none"
                >
                  Cara Pemesanan
                </button>
              </li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Tentang Kami</a></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Hubungi Kami</h3>
            <div className="flex items-start gap-3">
              <MapPin className="text-green-500 mt-1 shrink-0" size={20} />
              <div>
                <p className="font-bold">Kabupaten Magetan</p>
                <p className="text-sm text-gray-500">Jl. Manggis No. 33, Jawa Timur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL BOX (TAB CARA PEMESANAN) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay Gelap */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Konten Modal */}
          <div className="relative bg-white text-gray-900 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>

            <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-xs">?</span>
              Cara Pesan
            </h3>

            <div className="space-y-4">
              {langkahPesan.map((teks, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-600 font-medium leading-tight">{teks}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-colors"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}