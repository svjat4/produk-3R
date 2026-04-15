"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";
import { FAQS } from "@/data/faq";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.08)]">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,197,94,0.10),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.08),_transparent_30%)] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-0">
          {/* Left intro panel */}
          <div className="p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-gray-100">
            <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
              FAQ
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-black tracking-tight text-gray-900 leading-tight">
              Pertanyaan yang
              <span className="block text-green-600">sering ditanyakan</span>
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed max-w-md">
              Berikut beberapa pertanyaan umum seputar pemesanan, stok, pengiriman,
              hampers, dan pilihan oleh-oleh khas Magetan di Produk 3R.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <ShieldCheck
                  size={20}
                  className="text-green-600 mt-0.5 shrink-0"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Informasi lebih jelas
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    FAQ ini membantu pengunjung memahami alur pemesanan dan memilih
                    produk dengan lebih percaya diri.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 border border-gray-100 p-4">
                <MessageCircle
                  size={20}
                  className="text-green-600 mt-0.5 shrink-0"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Butuh bantuan cepat?
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Kalau pertanyaanmu belum terjawab, kamu bisa langsung hubungi
                    admin lewat WhatsApp untuk info stok dan pemesanan.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281231773663?text=Halo%2C%20saya%20ingin%20bertanya%20tentang%20produk%20oleh-oleh%20khas%20Magetan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-8 items-center justify-center gap-3 rounded-2xl bg-gray-900 px-6 py-4 font-bold text-white transition-all hover:bg-green-600"
            >
              <MessageCircle size={18} />
              Tanya via WhatsApp
            </a>
          </div>

          {/* Right accordion */}
          <div className="p-4 md:p-6 lg:p-8">
            <div className="space-y-4">
              {FAQS.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.question}
                    className={`overflow-hidden rounded-[1.75rem] border transition-all duration-300 ${
                      isOpen
                        ? "border-green-200 bg-green-50/40 shadow-sm"
                        : "border-gray-100 bg-white"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-bold text-gray-900 leading-relaxed">
                        {item.question}
                      </span>

                      <span
                        className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                          isOpen
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm md:text-[15px]">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}