"use client";

import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-16">
      <div className="text-center mb-8">
        <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
          Testimoni
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900">
          Apa kata pelanggan kami
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Beberapa pengalaman pelanggan yang sudah memesan oleh-oleh khas Magetan dari Produk 3R.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm"
          >
            <div className="flex items-center gap-1 text-orange-400 mb-4">
              {Array.from({ length: item.rating }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed mb-5">
              “{item.message}”
            </p>

            <div className="border-t border-gray-100 pt-4">
              <p className="font-bold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.city} • {item.product}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}