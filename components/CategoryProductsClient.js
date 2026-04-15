"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Plus, Star, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CategoryProductsClient({ products, categoryName }) {
  const { addToCart } = useCart();

  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20kategori%20ini";

  const getTagStyle = (tag) => {
    switch (tag) {
      case "Terlaris":
        return "bg-orange-500 text-white";
      case "Favorit":
        return "bg-green-600 text-white";
      case "Baru":
        return "bg-blue-600 text-white";
      case "Tradisional":
        return "bg-emerald-600 text-white";
      case "Pedas":
        return "bg-red-600 text-white";
      default:
        return "bg-black/75 text-white";
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {products.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-[2rem] p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Produk belum tersedia
          </h2>
          <p className="text-gray-600">
            Belum ada produk untuk kategori {categoryName}.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <article
              key={product.id}
              className="group relative overflow-hidden rounded-[2rem] border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(0,0,0,0.12)]"
            >
              {product.tag && (
                <div
                  className={`absolute top-4 left-4 z-10 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-wider shadow-md ${getTagStyle(
                    product.tag
                  )}`}
                >
                  {product.tag}
                </div>
              )}

              <Link
                href={`/produk/${product.slug}`}
                className="relative block aspect-[4/5] overflow-hidden bg-gray-50"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-green-700">
                      {product.category}
                    </p>
                    <Link
                      href={`/produk/${product.slug}`}
                      className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-green-600"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="shrink-0 rounded-xl bg-gray-50 px-2 py-1">
                    <div className="flex items-center gap-1 text-orange-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold text-gray-600">
                        {product.rating?.toFixed(1) || "5.0"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="min-h-[44px] text-sm leading-relaxed text-gray-500 line-clamp-2">
                  {product.shortDesc || product.description || product.desc}
                </p>

                <div className="mt-5 mb-5 flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Berat: <span className="font-semibold text-gray-700">{product.weight}</span>
                  </span>
                  <span className="font-semibold text-green-700">{product.status}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                      Harga
                    </p>
                    <span className="text-2xl font-black text-gray-900">
                      Rp{product.price.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white transition-all hover:bg-green-600 active:scale-95"
                    aria-label={`Tambah ${product.name} ke keranjang`}
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/produk/${product.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800"
                  >
                    Lihat detail
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-[2.5rem] bg-gray-900 px-8 py-10 text-center text-white shadow-2xl">
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          Butuh bantuan memilih produk?
        </h2>
        <p className="mx-auto mb-7 max-w-2xl text-gray-300 leading-relaxed">
          Hubungi kami untuk tanya stok, rekomendasi oleh-oleh, dan pesanan
          hampers.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition-all hover:bg-green-700"
        >
          <MessageCircle size={20} />
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  );
}