import Link from "next/link";
import Image from "next/image";
import { Plus, Star, ArrowUpRight } from "lucide-react";

export default function ProductCard({ product, onAdd }) {
  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case "terlaris":
        return "bg-orange-500 text-white";
      case "baru":
        return "bg-blue-600 text-white";
      case "favorit":
        return "bg-rose-500 text-white";
      case "tradisional":
        return "bg-emerald-600 text-white";
      case "pedas":
        return "bg-red-600 text-white";
      case "pre-order":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      default:
        return "bg-black/70 text-white";
    }
  };

  const handleAddToCart = () => {
    if (typeof onAdd === "function") {
      onAdd(product);
    }
  };

  return (
    <article className="group relative bg-white rounded-[2rem] border border-gray-100 p-4 transition-all duration-300 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1">
      <div className="relative aspect-[4/5] bg-[#F8F9F8] rounded-[1.75rem] mb-5 overflow-hidden">
        {product.tag && (
          <div
            className={`absolute top-4 left-4 z-10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${getTagColor(
              product.tag
            )}`}
          >
            {product.tag}
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-[2px]">
          <Link
            href={`/produk/${product.slug}`}
            aria-label={`Lihat detail ${product.name}`}
            className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
          >
            <ArrowUpRight size={22} strokeWidth={2.5} />
          </Link>
        </div>

        <Link href={`/produk/${product.slug}`} className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.imageAlt || product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      </div>

      <div className="px-2 pb-2">
        <div className="flex justify-between items-start gap-3 mb-2">
          <div>
            <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">
              {product.category || "Produk Pilihan"}
            </p>

            <Link href={`/produk/${product.slug}`}>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg shrink-0">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            <span className="text-[11px] font-bold text-gray-600">
              {product.rating?.toFixed(1) || "5.0"}
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 font-medium leading-relaxed min-h-[40px]">
          {product.shortDesc || product.description || product.desc}
        </p>

        <div className="flex items-center justify-between text-xs mb-5">
          <span className="text-gray-500">
            Berat: <span className="font-semibold text-gray-700">{product.weight}</span>
          </span>
          <span className="font-semibold text-green-700">{product.status}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              Mulai dari
            </p>
            <span className="text-2xl font-black text-gray-900 tracking-tight">
              Rp{product.price.toLocaleString("id-ID")}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className="relative overflow-hidden bg-gray-900 text-white h-14 w-14 rounded-[1.25rem] flex items-center justify-center transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 active:scale-95 group/btn"
          >
            <Plus
              size={24}
              strokeWidth={2.5}
              className="group-hover/btn:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        <div className="mt-4">
          <Link
            href={`/produk/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800"
          >
            Lihat detail
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}