// app/keranjang/page.js
"use client";

import { useCart } from "@/context/CartContext";
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  AlertCircle,
  Minus,
  Plus,
  Tag,
  ShieldCheck,
  Truck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export default function HalamanKeranjang() {
  const { cart, updateQty, removeFromCart, updateCartItem, totalPrice } = useCart();

  // Validasi varian produk
  const isVarianMissing = cart.some(
    (item) => item.variants && item.variants.length > 0 && !item.selectedVariant
  );

  // Schema.org JSON-LD untuk Breadcrumb & Cart WebPage (SEO / GEO)
  const cartJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/keranjang/#webpage`,
        url: `${SITE_URL}/keranjang`,
        name: "Keranjang Belanja Oleh-oleh Khas Magetan | Produk 3R",
        description:
          "Halaman konfirmasi keranjang belanja oleh-oleh khas Magetan: Rengginang, Madu Mongso, Lempeng Puli, dan Keripik Tempe siap dikirim langsung dari Magetan, Jawa Timur.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
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
              name: "Keranjang Belanja",
              item: `${SITE_URL}/keranjang`,
            },
          ],
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-slate-50/60 px-4 sm:px-6 py-12 md:py-20 text-slate-900">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cartJsonLd) }}
      />

      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-100/40 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Navigasi Kembali */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-green-700 transition-colors font-medium group"
            aria-label="Kembali ke halaman utama untuk melanjutkan belanja"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Kembali Eksplor Oleh-Oleh Magetan</span>
          </Link>
        </div>

        {/* Header Halaman */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200/60 px-3 py-1 rounded-full mb-3">
            <MapPin size={14} />
            <span>Pengiriman Langsung dari Magetan, Jawa Timur</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Keranjang <span className="text-green-600">Belanja Anda</span>.
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Periksa pesanan jajanan khas Magetan Anda sebelum dilanjutkan ke proses pemesanan via WhatsApp.
          </p>
        </header>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List Produk (7 Cols pada Large Screen) */}
            <section className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
                {cart.map((item) => (
                  <article
                    key={item.cartItemId}
                    className="p-5 sm:p-6 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Foto Produk Optimasi Next.js */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200/60">
                        <Image
                          src={item.image}
                          alt={`${item.name} - Oleh-oleh Khas Magetan`}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-cover"
                        />
                      </div>

                      {/* Detail Produk */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug truncate">
                              {item.name}
                            </h2>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all shrink-0"
                              aria-label={`Hapus ${item.name} dari keranjang`}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                              {item.weight}
                            </span>
                            <span>•</span>
                            <span className="text-green-700 font-medium">Garansi Fresh</span>
                          </div>
                        </div>

                        {/* Pilihan Varian */}
                        {item.variants && item.variants.length > 0 && (
                          <div className="mt-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                              {item.selectedVariant ? (
                                <>
                                  <Tag size={12} className="text-green-600" />
                                  <span>Varian Terpilih:</span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={12} className="text-amber-500" />
                                  <span className="text-amber-600 font-bold">Pilih Varian (Wajib)</span>
                                </>
                              )}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {item.variants.map((v) => (
                                <button
                                  key={v}
                                  type="button"
                                  onClick={() =>
                                    updateCartItem(item.cartItemId, { selectedVariant: v })
                                  }
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                                    item.selectedVariant === v
                                      ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                  }`}
                                >
                                  {v}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Catatan Pembeli */}
                        <div className="relative mt-3">
                          <MessageSquare
                            className="absolute left-3 top-3 text-slate-400"
                            size={14}
                          />
                          <textarea
                            placeholder="Catatan khusus (contoh: rasa ekstra pedas, bungkus besek, dll.)..."
                            value={item.note || ""}
                            onChange={(e) =>
                              updateCartItem(item.cartItemId, { note: e.target.value })
                            }
                            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 pl-9 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-600 focus:bg-white outline-none transition-all resize-none min-h-[60px]"
                          />
                        </div>

                        {/* Counter & Harga */}
                        <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-100">
                          <div className="flex items-center border border-slate-200 bg-white rounded-xl p-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-700 rounded-lg transition-all"
                              aria-label="Kurangi jumlah"
                            >
                              <Minus size={13} strokeWidth={2.5} />
                            </button>
                            <span className="w-8 text-center font-bold text-xs sm:text-sm text-slate-900">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-700 rounded-lg transition-all"
                              aria-label="Tambah jumlah"
                            >
                              <Plus size={13} strokeWidth={2.5} />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs text-slate-400 block font-medium">Subtotal</span>
                            <span className="text-base sm:text-lg font-black text-slate-900">
                              Rp{(item.price * item.qty).toLocaleString("id-ID")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Ringkasan & Checkout (5 Cols) */}
            <aside className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                  Ringkasan Pesanan
                </h3>

                {/* Alert jika varian belum dipilih */}
                {isVarianMissing && (
                  <div className="mb-6 bg-amber-50 p-4 rounded-2xl flex items-start gap-3 border border-amber-200/80 text-xs">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="font-semibold text-amber-800 leading-relaxed">
                      Mohon tentukan pilihan varian produk terlebih dahulu sebelum melakukan pesanan.
                    </p>
                  </div>
                )}

                <div className="space-y-3 mb-6 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Total Item ({cart.reduce((acc, curr) => acc + curr.qty, 0)})</span>
                    <span className="font-semibold text-slate-900">
                      Rp{totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Estimasi Ongkos Kirim</span>
                    <span className="text-green-600 font-bold">Dihitung via WhatsApp</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        Total Pembayaran
                      </span>
                      <span className="text-[11px] text-slate-500">Belum termasuk ongkir</span>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-green-600 tracking-tight">
                      Rp{totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Tombol WhatsApp Checkout */}
                <div className={isVarianMissing ? "opacity-50 pointer-events-none grayscale" : ""}>
                  <WhatsAppButton variant="checkout" />
                </div>

                {/* GEO & Trust Badges */}
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2">
                    <Truck size={15} className="text-green-600 shrink-0" />
                    <span>Pengiriman aman ke seluruh Indonesia via J&T, JNE, Pos & Cargo.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={15} className="text-green-600 shrink-0" />
                    <span>Garansi produk segar & kemasan ekstra aman (Free Bubble Wrap).</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-green-600 shrink-0" />
                    <span>Diolah oleh pengrajin makanan tradisional khas Magetan (Produk 3R).</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <ShoppingBag size={36} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              Keranjang Belanja Masih Kosong
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Anda belum menambahkan oleh-oleh khas Magetan ke dalam keranjang. Yuk eksplor aneka rengginang, madu mongso, dan keripik renyah kami!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-green-600 text-white px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <span>Lihat Produk Oleh-Oleh</span>
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}