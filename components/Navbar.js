import Link from 'next/link';
import { ShoppingCart, MapPin } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 group transition-all duration-300 hover:scale-105">
        {/* Kotak Logo 'M' Modern */}
        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:bg-green-700 group-hover:rotate-12 transition-all duration-300">
          <span className="text-white font-extrabold text-sm tracking-widest">3R</span>
        </div>

        {/* Teks Nama Toko dengan Spasi dan Efek */}
        <div className="flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-gray-900 leading-none">
            Produk 3R<span className="text-gray-300 mx-1">|</span>{/* Pembatas Elegan */}
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-orange-400 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-green-600 transition-all duration-500">
              MAGETAN
            </span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 group-hover:text-green-700 transition-colors">
            Karya Lokal Berkelanjutan
          </span>
        </div>
      </Link>

        <div className="flex items-center gap-6">
          <a 
            href="https://maps.app.goo.gl/y6YtYn7yrn2iivUy8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-green-600 transition-colors cursor-pointer"
          >
            <MapPin size={14} className="text-red-500" />
            Jl. Manggis No. 33, Magetan, Jatim
          </a>
          
          <Link href="/keranjang" className="relative p-2 hover:bg-gray-50 rounded-full transition-colors group">
            <ShoppingCart size={24} className="text-gray-700 group-hover:text-green-600" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}