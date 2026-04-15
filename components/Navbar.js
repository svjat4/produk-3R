"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingCart, MapPin, X, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const categoryLinks = [
  {
    name: "Oleh-oleh Khas Magetan",
    href: "/kategori/oleh-oleh-khas-magetan",
  },
  {
    name: "Jajanan Khas Magetan",
    href: "/kategori/jajanan-khas-magetan",
  },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [kategoriOpen, setKategoriOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Produk", href: "/produk" },
    { name: "Tentang", href: "/tentang" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 min-h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="w-11 h-11 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:bg-green-700 group-hover:rotate-6 transition-all duration-300">
            <span className="text-white font-extrabold text-sm tracking-widest">
              3R
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-lg md:text-2xl font-black tracking-tight text-gray-900 leading-none">
              Produk 3R
              <span className="text-gray-300 mx-1">|</span>
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-orange-400 bg-clip-text text-transparent">
                MAGETAN
              </span>
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.22em] mt-0.5 hidden sm:block">
              Oleh-oleh khas Magetan
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all"
            >
              {item.name}
            </Link>
          ))}

          {/* Dropdown kategori */}
          <div className="relative group">
            <button
              type="button"
              className="px-4 py-2 rounded-full text-sm font-bold text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all inline-flex items-center gap-2"
            >
              Kategori
              <ChevronDown size={16} />
            </button>

            <div className="absolute top-full left-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="w-64 rounded-2xl border border-gray-100 bg-white shadow-xl p-2">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="https://maps.app.goo.gl/y6YtYn7yrn2iivUy8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-xs font-bold text-gray-500 hover:text-green-700 hover:bg-green-50 transition-all"
          >
            <MapPin size={14} className="text-red-500" />
            Magetan, Jawa Timur
          </a>

          <Link
            href="/keranjang"
            className="relative p-3 hover:bg-gray-50 rounded-2xl transition-colors group"
            aria-label="Lihat keranjang"
          >
            <ShoppingCart
              size={22}
              className="text-gray-700 group-hover:text-green-600"
            />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-black min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-3 hover:bg-gray-50 rounded-2xl transition-colors"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-gray-700" />
            ) : (
              <Menu size={22} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all"
              >
                {item.name}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setKategoriOpen((prev) => !prev)}
              className="px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all flex items-center justify-between"
            >
              Kategori
              <ChevronDown
                size={16}
                className={`transition-transform ${kategoriOpen ? "rotate-180" : ""}`}
              />
            </button>

            {kategoriOpen && (
              <div className="pl-3 flex flex-col gap-2">
                {categoryLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setKategoriOpen(false);
                    }}
                    className="px-4 py-3 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <a
              href="https://maps.app.goo.gl/y6YtYn7yrn2iivUy8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gray-50 text-sm font-semibold text-gray-600 hover:bg-green-50 hover:text-green-700 transition-all"
            >
              <MapPin size={16} className="text-red-500" />
              Lihat lokasi toko
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}