import Link from "next/link";
import {
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
} from "lucide-react";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi Produk 3R Magetan untuk pemesanan, pertanyaan stok, pengiriman, dan informasi oleh-oleh khas Magetan.",
};

export default function KontakPage() {
  const whatsappUrl =
    "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20oleh-oleh%20khas%20Magetan";

  const mapsUrl = "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8";

  return (
    <main className="min-h-screen bg-[#fcfdfa]">
      {/* HERO */}
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
            <span className="font-medium text-gray-900">Kontak</span>
          </nav>

          <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
            Hubungi Kami
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            Kontak
            <span className="block text-green-600">Produk 3R Magetan</span>
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
            Untuk pertanyaan stok, pemesanan, hampers, atau pengiriman, silakan
            hubungi kami melalui kontak berikut.
          </p>
        </div>
      </section>

      {/* INFO + CTA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kartu informasi */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Informasi Kontak
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MessageCircle className="text-green-600 mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900">WhatsApp</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800"
                  >
                    +62 812-3177-3663
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="text-green-600 mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900">Telepon</p>
                  <p className="text-gray-600">+62 812-3177-3663</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-green-600 mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900">Alamat</p>
                  <p className="text-gray-600">Jl. Manggis No. 33, Magetan, Jawa Timur</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3 className="text-green-600 mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900">Jam Operasional</p>
                  <p className="text-gray-600">Setiap hari, 08.00 - 17.00</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Instagram className="text-green-600 mt-1 shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900">Instagram</p>
                  <a
                    href="https://www.instagram.com/produk3r.magetan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800"
                  >
                    @produk3r.magetan
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu aksi cepat */}
          <div className="bg-gray-900 text-white rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black mb-4">
                Butuh bantuan cepat?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Hubungi kami langsung untuk konfirmasi stok, pesanan oleh-oleh,
                hampers, parcel, atau pengiriman.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
                    Respon Cepat
                  </p>
                  <p className="text-sm text-white">
                    Tanyakan stok dan detail pesanan langsung via WhatsApp.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-400 font-bold mb-2">
                    Lokasi Toko
                  </p>
                  <p className="text-sm text-white">
                    Cek lokasi toko dan arah perjalanan melalui Google Maps.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all"
              >
                <MessageCircle size={20} />
                Chat via WhatsApp
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
              >
                <MapPin size={20} />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EMBED MAPS */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-[2rem] border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              Lokasi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Datang langsung ke lokasi untuk melihat produk atau ambil pesanan.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-gray-100">
            <iframe
              title="Lokasi Produk 3R Magetan"
              src="https://www.google.com/maps?q=Jl.%20Manggis%20No.%2033%20Magetan%20Jawa%20Timur&z=15&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-600 transition-all"
            >
              <MapPin size={18} />
              Buka Rute di Google Maps
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-2xl font-bold hover:bg-green-100 transition-all"
            >
              <MessageCircle size={18} />
              Konfirmasi via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}