import Link from "next/link";
import {
  ChevronRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Instagram,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Truck,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";

const SITE_URL = "https://www.jajananmagetan.biz.id";
const WHATSAPP_URL =
  "https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20oleh-oleh%20khas%20Magetan";
const MAPS_URL = "https://share.google/StJEZjxuvKRLJOSdg";
const MAPS_APP_URL = "https://maps.app.goo.gl/y6YtYn7yrn2iivUy8";

export const metadata = {
  title: "Kontak & Lokasi Toko | Produk 3R Magetan",
  description:
    "Hubungi Produk 3R Magetan via WhatsApp +62 812-3177-3663 atau kunjungi lokasi toko di Jl. Manggis No. 33 Magetan. Melayani pemesanan eceran, grosir, dan hampers oleh-oleh.",
  alternates: {
    canonical: `${SITE_URL}/kontak`,
  },
  keywords: [
    "kontak produk 3r magetan",
    "alamat toko oleh oleh magetan",
    "nomor whatsapp produk 3r",
    "lokasi produk 3r magetan",
    "pusat oleh oleh magetan jalan manggis",
    "grosir snack magetan kontak",
  ],
  other: {
    "geo.region": "ID-JI",
    "geo.placename": "Kabupaten Magetan",
    "geo.position": "-7.6521;111.3263",
    ICBM: "-7.6521, 111.3263",
  },
  openGraph: {
    title: "Hubungi Produk 3R Magetan - Pusat Oleh-oleh Khas Magetan",
    description:
      "Layanan pelanggan resmi Produk 3R. Tanya stok, pemesanan hampers, eceran, grosir, dan rute toko fisik.",
    url: `${SITE_URL}/kontak`,
    siteName: "Produk 3R Magetan",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Kontak Resmi Produk 3R Magetan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi Produk 3R Magetan",
    description:
      "Informasi kontak, WhatsApp, dan lokasi toko resmi Produk 3R Magetan.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function KontakPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/kontak/#webpage`,
        url: `${SITE_URL}/kontak`,
        name: "Kontak & Lokasi Produk 3R Magetan",
        description:
          "Halaman kontak resmi, layanan WhatsApp, dan lokasi fisik toko Produk 3R Magetan.",
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Kontak",
              item: `${SITE_URL}/kontak`,
            },
          ],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Produk 3R Magetan",
        telephone: "+6281231773663",
        priceRange: "Rp10.000 - Rp150.000",
        image: `${SITE_URL}/logo.jpg`,
        hasMap: MAPS_URL,
        sameAs: [MAPS_URL, MAPS_APP_URL, "https://instagram.com/produk3r.magetan"],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Manggis No. 33",
          addressLocality: "Magetan",
          addressRegion: "Jawa Timur",
          postalCode: "63314",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -7.6521,
          longitude: 111.3263,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/60 font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 rounded-full bg-emerald-600/5 blur-2xl" />

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            <Link
              href="/"
              className="transition-colors hover:text-emerald-600"
            >
              Beranda
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-emerald-700 font-bold">Kontak</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 backdrop-blur-sm">
            <Sparkles size={13} className="text-emerald-600" />
            Layanan Pelanggan & Lokasi
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl leading-[1.1]">
            Terhubung Langsung dengan{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Produk 3R Magetan
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed">
            Konsultasi produk, tanya ketersediaan stok, pesanan khusus hampers,
            atau rute lokasi toko kami siap melayani Anda dengan cepat.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Informasi Detail Kontak (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                Informasi Resmi & Media Komunikasi
              </h2>

              <div className="space-y-6">
                {/* WhatsApp Item */}
                <div className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform group-hover:scale-105">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Layanan Utama WhatsApp
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      +62 812-3177-3663
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Kirim Pesan WhatsApp <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Telepon Item */}
                <div className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform group-hover:scale-105">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Sambungan Telepon
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      +62 812-3177-3663
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tersedia pada jam kerja operasional toko.
                    </p>
                  </div>
                </div>

                {/* Alamat Item */}
                <div className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform group-hover:scale-105">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Alamat Outlet Fizik
                    </span>
                    <p className="text-base font-bold text-slate-900 leading-snug">
                      Jl. Manggis No. 33, Magetan
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Jawa Timur, Kode Pos 63314, Indonesia
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform group-hover:scale-105">
                    <Clock3 size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Jam Buka Toko
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      Senin - Minggu: 08.00 - 17.00 WIB
                    </p>
                    <p className="text-xs font-medium text-emerald-600 mt-0.5">
                      Buka Setiap Hari (Termasuk Hari Libur Nasional)
                    </p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100/80 text-emerald-700 transition-transform group-hover:scale-105">
                    <Instagram size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Instagram Resmi
                    </span>
                    <p className="text-base font-bold text-slate-900">
                      @produk3r.magetan
                    </p>
                    <a
                      href="https://www.instagram.com/produk3r.magetan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                    >
                      Ikuti di Instagram <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: High-Conversion SaaS Dark Card CTA (Col 5) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-2xl border border-slate-800 flex flex-col justify-between">
              {/* Decorative Background Mesh */}
              <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative z-10">
                {/* Live Status Indicator */}
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Layanan Bantuan Cepat
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white mb-3">
                  Pemesanan & Pertanyaan Cepat
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Tim kami siap menjawab konfirmasi stok, harga grosir reseller,
                  serta paket hampers secara instant melalui WhatsApp.
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Respon cepat dalam hitungan menit</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Pilihan eceran, grosir & custom hampers</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>Pengiriman aman ke seluruh wilayah Indonesia</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 space-y-3 pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-emerald-500 py-4 px-6 text-sm font-extrabold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.99]"
                >
                  <MessageCircle size={18} />
                  Chat Sekarang via WhatsApp
                </a>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 py-3.5 px-6 text-sm font-bold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
                >
                  <MapPin size={18} />
                  Petunjuk Arah Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GOOGLE MAPS EMBED SECTION */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Peta & Lokasi Toko Fizik
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Kunjungi toko kami secara langsung di Magetan untuk memilih produk fresh secara bertatap muka.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={MAPS_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-600"
              >
                <MapPin size={15} />
                Buka di Aplikasi Maps
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-inner">
            <iframe
              title="Lokasi Toko Produk 3R Magetan"
              src="https://www.google.com/maps?q=Jl.%20Manggis%20No.%2033%20Magetan%20Jawa%20Timur&z=16&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* TRUST FEATURES / SERVICES BAR */}
      <section className="border-t border-slate-200/80 bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Produk Asli & Fresh</p>
              <p className="text-xs text-slate-500 mt-0.5">Langsung dari produsen lokal Magetan</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <PackageCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Paket Hampers & Grosir</p>

              <p className="text-xs text-slate-500 mt-0.5">Melayani pesanan partai & acara</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Truck size={24} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Pengiriman Aman</p>
              <p className="text-xs text-slate-500 mt-0.5">Diisi bubble wrap & kardus tebal</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}