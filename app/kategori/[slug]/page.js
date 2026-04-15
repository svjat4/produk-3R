import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, MessageCircle, Plus, Star, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
      description: "Kategori yang kamu cari tidak ditemukan.",
    };
  }

  return {
    title: category.title,
    description: category.description,
    openGraph: {
      title: `${category.title} | Produk 3R Magetan`,
      description: category.description,
      url: `https://www.jajananmagetan.biz.id/kategori/${category.slug}`,
      siteName: "Produk 3R Magetan",
      locale: "id_ID",
      type: "website",
    },
  };
}

export default async function KategoriPage({ params }) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter((product) =>
    category.matchCategories.includes(product.category)
  );

  return (
    <main className="min-h-screen bg-[#fcfdfa] pb-20">
      <section className="border-b border-gray-100 bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="hover:text-green-700 transition-colors">
              Beranda
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="font-medium text-gray-900">{category.name}</span>
          </nav>

          <span className="inline-flex rounded-full border border-green-100 bg-green-50 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-green-700">
            Halaman Kategori
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-gray-900 leading-tight">
            {category.title}
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      <CategoryProductsClient products={categoryProducts} categoryName={category.name} />
    </main>
  );
}