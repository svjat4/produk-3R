import Link from "next/link";
import { BadgeCheck, HeartHandshake, Store, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Kenal lebih dekat dengan Produk 3R Magetan, toko oleh-oleh khas Magetan dengan pilihan jajanan tradisional dan camilan favorit.",
};

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfa]">
      <section className="border-b border-gray-100 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="hover:text-green-700 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium text-gray-900">Tentang</span>
          </nav>

          <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
            Tentang Produk 3R
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            Toko Oleh-oleh
            <span className="block text-green-600">Khas Magetan</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
            Produk 3R Magetan hadir untuk membantu kamu menemukan pilihan
            jajanan dan makanan khas Magetan yang cocok untuk oleh-oleh,
            hampers, dan stok camilan keluarga.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <Store className="text-green-600 mb-4" size={24} />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Fokus pada produk pilihan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kami menghadirkan berbagai camilan dan makanan khas Magetan yang
              cocok untuk buah tangan, sajian tamu, hingga parcel spesial.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <BadgeCheck className="text-green-600 mb-4" size={24} />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Lebih mudah dipesan
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Website ini dibuat agar pelanggan bisa melihat katalog produk,
              memilih item, lalu memesan dengan lebih praktis melalui WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
            <HeartHandshake className="text-green-600 mb-4" size={24} />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Cocok untuk oleh-oleh
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Kami ingin membantu pelanggan menemukan pilihan oleh-oleh khas
              Magetan yang enak, menarik, dan layak dibagikan ke keluarga atau
              kerabat.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-4">
            Kenapa memilih Produk 3R Magetan?
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Kami berfokus pada katalog oleh-oleh dan jajanan khas Magetan yang
              mudah dijelajahi, mudah dipilih, dan mudah dipesan.
            </p>
            <p>
              Dengan website ini, pelanggan bisa melihat produk, memeriksa
              detail, menambahkan ke keranjang, dan langsung melanjutkan
              komunikasi pesanan melalui WhatsApp.
            </p>
            <p>
              Tujuan kami sederhana: membuat pengalaman mencari oleh-oleh khas
              Magetan menjadi lebih nyaman, lebih modern, dan lebih meyakinkan.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}