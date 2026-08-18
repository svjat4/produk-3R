import Link from "next/link";
import {
  BadgeCheck,
  HeartHandshake,
  Store,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export const metadata = {
  title: "Tentang Kami | Produk 3R Magetan - Pusat Oleh-Oleh Khas",
  description:
    "Mengenal Produk 3R Magetan, produsen dan pusat oleh-oleh khas Magetan. Menghadirkan jajanan tradisional seperti rengginang, wajik, dan madu mongso segar & higienis.",
  alternates: {
    canonical: `${SITE_URL}/tentang`,
  },
  keywords: [
    "tentang produk 3r magetan",
    "profil produk 3r",
    "produsen rengginang magetan",
    "pusat oleh oleh khas magetan",
    "sejarah produk 3r magetan",
    "umkm kuliner magetan",
  ],
  openGraph: {
    title: "Tentang Produk 3R Magetan - Cita Rasa Autentik Magetan",
    description:
      "Produsen dan pusat oleh-oleh khas Magetan terpercaya dengan standar mutu higienis dan cita rasa tradisional.",
    url: `${SITE_URL}/tentang`,
    siteName: "Produk 3R Magetan",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Tentang Produk 3R Magetan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami | Produk 3R Magetan",
    description:
      "Produsen oleh-oleh khas Magetan terpercaya dengan cita rasa autentik dan kualitas unggulan.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function TentangPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/tentang/#webpage`,
        url: `${SITE_URL}/tentang`,
        name: "Tentang Kami - Produk 3R Magetan",
        description:
          "Profil resmi Produk 3R Magetan sebagai penyedia dan produsen oleh-oleh khas Magetan berkualitas.",
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
              name: "Tentang Kami",
              item: `${SITE_URL}/tentang`,
            },
          ],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Produk 3R Magetan",
        description:
          "Produsen dan toko oleh-oleh khas Magetan dengan sajian Rengginang, Wajik, Madu Mongso, dan camilan tradisional.",
        telephone: "+6281231773663",
        priceRange: "Rp10.000 - Rp150.000",
        image: `${SITE_URL}/logo.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Manggis No. 33",
          addressLocality: "Magetan",
          addressRegion: "Jawa Timur",
          postalCode: "63314",
          addressCountry: "ID",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-10 -z-10 h-72 w-72 rounded-full bg-emerald-600/5 blur-2xl" />

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb UI */}
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
            <span className="text-emerald-700 font-bold">Tentang Kami</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800 backdrop-blur-sm">
            <Sparkles size={13} className="text-emerald-600" />
            Dedikasi UMKM Kuliner Magetan
          </div>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl leading-[1.1]">
            Menghadirkan Cita Rasa Autentik{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Oleh-Oleh Khas Magetan
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg leading-relaxed">
            Produk 3R Magetan berkomitmen menyajikan jajanan tradisional pilihan
            yang diolah secara higienis, fresh, dan siap menjadi pelengkap momen
            istimewa bersama keluarga maupun oleh-oleh spesial.
          </p>
        </div>
      </section>

      {/* VALUE STATS BAR */}
      <section className="mx-auto max-w-6xl px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm text-center">
          <div>
            <p className="text-2xl md:text-3xl font-black text-emerald-600">100%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Bahan Alami Pilihan</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-emerald-600">Fresh</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Produksi Berkala</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-emerald-600">Higienis</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Kemasan Tersegel</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-black text-emerald-600">Satu Pintu</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Kemudahan Order WA</p>
          </div>
        </div>
      </section>

      {/* CORE PILLARS GRID */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
              <Store size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Katalog Pilihan Terlengkap
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Kami memfokuskan lini produk pada varian favorit khas Magetan seperti
              Rengginang gurih, Wajik legit, dan Madu Mongso segar yang cocok untuk
              oleh-oleh maupun hampers.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
              <BadgeCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Kemudahan Pemesanan Digital
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Melalui platform web modern ini, Anda dapat menjelajahi katalog, memilih
              paket eceran atau grosir, dan melakukan konfirmasi cepat via WhatsApp tanpa kendala.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-5">
              <HeartHandshake size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Standar Mutu & Pengemasan
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Setiap produk dikemas rapi menggunakan standar perlindungan ekstra
              (bubble wrap & kardus tebal) guna memastikan kesegaran cita rasa tetap terjaga.
            </p>
          </div>

        </div>

        {/* E-E-A-T STORY SECTION */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 md:p-10 shadow-sm mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 mb-4">
            <Award size={14} />
            Komitmen Kualitas UMKM
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
            Misi & Dedikasi Produk 3R Magetan
          </h2>

          <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
            <p>
              Berawal dari keinginan memperkenal kuliner dan camilan tradisional khas Kabupaten Magetan
              ke jangkauan yang lebih luas, **Produk 3R Magetan** hadir sebagai jembatan antara
              keaslian resep lokal dan kepraktisan belanja modern.
            </p>
            <p>
              Kami memastikan setiap bahan baku diolah dengan memperhatikan kebersihan dan mutu rasa.
              Baik untuk konsumsi pribadi, hampers hari raya, acara keluarga, hingga pasokan toko grosir,
              kami selalu mengedepankan kualitas pelayanan ramah dan responsif.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Resep Warisan Nusantara</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Bebas Bahan Pengawet Berbahaya</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Pelayanan Pesanan Partai Besar / Small Batch</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-slate-800">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Pengiriman Cepat Seluruh Indonesia</span>
            </div>
          </div>
        </div>

        {/* HIGH-CONVERSION CTA BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-10 text-white shadow-xl">
          <div className="absolute top-0 right-0 -z-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                Siap Menikmati Oleh-Oleh Khas Magetan?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Jelajahi seluruh katalog produk unggulan kami atau hubungi tim customer service
                untuk konsultasi paket hampers dan pemesanan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.99]"
              >
                Lihat Katalog Produk
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}