import Link from 'next/link';
import { ShoppingCart, Plus, Star, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product, onAdd }) {
  // Mapping warna badge agar lebih dinamis sesuai tag
  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'terlaris': return 'bg-orange-500 text-white';
      case 'baru': return 'bg-blue-600 text-white';
      case 'favorit': return 'bg-rose-500 text-white';
      case 'pre-order': return 'bg-amber-100 text-amber-700 border border-amber-200';
      default: return 'bg-black/70 text-white';
    }
  };

  return (
    <div className="group relative bg-white rounded-[2.5rem] border border-gray-100 p-4 transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2">
      
      {/* Area Gambar */}
      <div className="relative aspect-[4/5] bg-[#F8F9F8] rounded-[2rem] mb-5 overflow-hidden">
        {/* Badge Tag Dinamis */}
        {product.tag && (
          <div className={`absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getTagColor(product.tag)}`}>
            {product.tag}
          </div>
        )}

        {/* Tombol Quick Link (Muncul saat hover) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center backdrop-blur-[2px]">
           <Link 
             href={`/produk/${product.slug}`}
             className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
           >
             <ArrowUpRight size={24} strokeWidth={2.5} />
           </Link>
        </div>

        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x500?text=Produk+Magetan";
          }}
        />
      </div>

      {/* Konten Detail */}
      <div className="px-3 pb-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">{product.category || "Authentic"}</p>
            <Link href={`/produk/${product.slug}`}>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            <span className="text-[11px] font-bold text-gray-600">{product.rating || "5.0"}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
          {product.desc}
        </p>
        
        {/* Footer Card: Harga & Button */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Mulai dari</p>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              <span className="text-sm font-bold mr-0.5">Rp</span>
              {product.price.toLocaleString('id-ID')}
            </span>
          </div>
          
          <button 
            onClick={() => onAdd(product)}
            className="relative overflow-hidden bg-gray-900 text-white h-14 w-14 rounded-[1.25rem] flex items-center justify-center transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 active:scale-90 group/btn"
          >
            <Plus size={24} strokeWidth={2.5} className="group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}