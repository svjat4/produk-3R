"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Instagram,
  Facebook,
  MessageCircle,
  MapPin,
  X,
} from "lucide-react";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const langkahPesan = [
    "Pilih produk favorit Anda di katalog.",
    "Klik tombol keranjang untuk memasukkan belanjaan.",
    "Buka menu keranjang di pojok kanan atas.",
    "Klik 'Pesan via WhatsApp'.",
    "Konfirmasi pesanan dengan admin (alamat & pembayaran).",
  ];

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 mt-24 rounded-t-[3rem] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          
          {/* BRAND */}
          <div className="space-y-5">
            <h2 className="text-2xl font-black tracking-tight">
              PRODUK 3R{" "}
              <span className="text-green-500">MAGETAN</span>
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Toko oleh-oleh khas Magetan dengan pilihan jajanan tradisional,
              camilan favorit, dan produk lokal dari lereng Gunung Lawu.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/produk3r.magetan/"
                className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.instagram.com/produk3r.magetan/"
                className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center hover:bg-green-600 transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* MENU */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Navigasi
            </h3>

            <ul className="space-y-3 text-gray-400 font-medium text-sm">
              <li>
                <Link href="/" className="hover:text-green-500 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-green-500 transition-colors">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-green-500 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-green-500 transition-colors">
                  Kontak
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="hover:text-green-500 transition-colors"
                >
                  Cara Pemesanan
                </button>
              </li>
            </ul>
          </div>

          {/* KATEGORI */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Kategori
            </h3>

            <ul className="space-y-3 text-gray-400 font-medium text-sm">
              <li>
                <Link
                  href="/kategori/oleh-oleh-khas-magetan"
                  className="hover:text-green-500"
                >
                  Oleh-oleh Khas
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/jajanan-khas-magetan"
                  className="hover:text-green-500"
                >
                  Jajanan Tradisional
                </Link>
              </li>
            </ul>
          </div>

          {/* KONTAK */}
          <div className="space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Kontak
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="text-green-500 mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-white">
                  Magetan, Jawa Timur
                </p>
                <p className="text-sm text-gray-500">
                  Jl. Manggis No. 33
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/6281231773663"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all"
            >
              <MessageCircle size={18} />
              Chat WhatsApp
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Produk 3R Magetan. All rights reserved.</p>

          <div className="flex gap-4">
            <Link href="/tentang" className="hover:text-green-500">
              Tentang
            </Link>
            <Link href="/kontak" className="hover:text-green-500">
              Kontak
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL CARA PESAN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white text-gray-900 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} className="text-gray-400" />
            </button>

            <h3 className="text-2xl font-black mb-6">
              Cara Pemesanan
            </h3>

            <div className="space-y-4">
              {langkahPesan.map((teks, index) => (
                <div key={index} className="flex gap-4">
                  <span className="w-6 h-6 bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center rounded-full">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-600">{teks}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}