// app/produk/[slug]/page.js
"use client";
import { useParams } from "next/navigation";
import { Star, ShieldCheck, Truck, ShoppingCart } from "lucide-react";

// Simulasi data (Nanti ambil dari data/products.js)
const PRODUCTS = [
  { id: 1, slug: "roti-bolu-rahayu", name: "Roti Bolu Rahayu", price: 35000, desc: "Roti bolu legendaris khas Magetan dengan tekstur lembut dan aroma kayu manis yang menggugah selera. Cocok untuk buah tangan keluarga.", tag: "Terlaris", berat: "500gr" },
  { id: 2, slug: "jeruk-pamelo", name: "Jeruk Pamelo", price: 25000, desc: "Jeruk kebanggaan Magetan. Ukuran besar, bulir merah segar, dan rasa manis alami tanpa biji.", tag: "Musiman", berat: "1kg" },
];

export default function DetailProduk() {
  const { slug } = useParams();
  const produk = PRODUCTS.find((p) => p.slug === slug);

  if (!produk) return <div className="text-center py-20">Produk tidak ditemukan.</div>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Area Foto */}
        <div className="aspect-square bg-gray-200 rounded-3xl flex items-center justify-center text-gray-500">
          Foto {produk.name}
        </div>

        {/* Info Produk */}
        <div className="flex flex-col">
          <span className="text-orange-600 font-bold text-sm mb-2 uppercase tracking-widest">{produk.tag}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{produk.name}</h1>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /> <Star size={16} fill="currentColor" /></div>
            <span className="text-sm text-gray-500">(50+ Ulasan)</span>
          </div>

          <p className="text-3xl font-black text-green-700 mb-6">Rp{produk.price.toLocaleString()}</p>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-8">
            <p className="text-gray-600 leading-relaxed">{produk.desc}</p>
            <hr className="my-4 border-gray-50" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Berat Estimasi:</span>
              <span className="font-bold">{produk.berat}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8 text-[10px] text-center uppercase font-bold text-gray-400">
            <div className="flex flex-col items-center gap-2"><ShieldCheck size={20} className="text-green-600" /> Higienis</div>
            <div className="flex flex-col items-center gap-2"><Truck size={20} className="text-green-600" /> Kirim Cepat</div>
            <div className="flex flex-col items-center gap-2"><Star size={20} className="text-green-600" /> Kualitas Premium</div>
          </div>

          <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex justify-center items-center gap-3 hover:bg-green-700 transition-all">
            <ShoppingCart size={20} /> Tambah ke Keranjang
          </button>
        </div>
      </div>
    </main>
  );
}