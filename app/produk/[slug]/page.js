import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Star, ShieldCheck, Truck } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Produk 3R Magetan",
      description: "Produk yang kamu cari tidak ditemukan.",
    };
  }

  return {
    title: product.seoTitle || `${product.name} | Produk 3R Magetan`,
    description:
      product.seoDescription ||
      product.description ||
      product.desc ||
      "Produk oleh-oleh khas Magetan terbaik.",
    keywords: product.keywords || [
      product.name,
      "oleh-oleh khas Magetan",
      "jajanan khas Magetan",
      "Produk 3R Magetan",
    ],
    openGraph: {
      title: product.seoTitle || `${product.name} | Produk 3R Magetan`,
      description:
        product.seoDescription ||
        product.description ||
        product.desc ||
        "Produk oleh-oleh khas Magetan terbaik.",
      url: `https://www.jajananmagetan.biz.id/produk/${product.slug}`,
      siteName: "Produk 3R Magetan",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.imageAlt || product.name,
        },
      ],
      locale: "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || `${product.name} | Produk 3R Magetan`,
      description:
        product.seoDescription ||
        product.description ||
        product.desc ||
        "Produk oleh-oleh khas Magetan terbaik.",
      images: [product.image],
    },
  };
}

export default async function DetailProduk({ params }) {
  const { slug } = await params;

  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Halo, saya ingin memesan produk ${product.name}`
  );

  const productUrl = `https://www.jajananmagetan.biz.id/produk/${product.slug}`;
  const productImage = `https://www.jajananmagetan.biz.id${product.image}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [productImage],
    description: product.seoDescription || product.description || product.desc,
    category: product.category,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Produk 3R Magetan",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "IDR",
      price: product.price,
      availability:
        product.status === "Ready Stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Produk 3R Magetan",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: "https://www.jajananmagetan.biz.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produk",
        item: "https://www.jajananmagetan.biz.id/produk",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Breadcrumb UI */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500"
      >
        <Link href="/" className="hover:text-green-700 transition-colors">
          Beranda
        </Link>
        <ChevronRight size={16} className="text-gray-400" />

        <Link href="/produk" className="hover:text-green-700 transition-colors">
          Produk
        </Link>
        <ChevronRight size={16} className="text-gray-400" />

        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
            <Image
              src={product.image}
              alt={product.imageAlt || product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col">
          {product.tag && (
            <span className="inline-block w-fit text-orange-600 font-bold text-sm mb-3 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full">
              {product.tag}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex text-yellow-400">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-sm text-gray-500">
              {product.rating ? `${product.rating} / 5` : "Produk Favorit"}
            </span>
          </div>

          <p className="text-3xl font-black text-green-700 mb-6">
            Rp{product.price.toLocaleString("id-ID")}
          </p>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 shadow-sm">
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description || product.desc}
            </p>

            <hr className="my-4 border-gray-100" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Kategori</span>
                <span className="font-semibold text-gray-900">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Berat</span>
                <span className="font-semibold text-gray-900">
                  {product.weight}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold text-green-700">
                  {product.status}
                </span>
              </div>

              {product.origin && (
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Asal Produk</span>
                  <span className="font-semibold text-gray-900">
                    {product.origin}
                  </span>
                </div>
              )}
            </div>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 mb-3">
                Pilihan Varian
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <span
                    key={variant}
                    className="px-3 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700"
                  >
                    {variant}
                    {product.variantPrices?.[variant]
                      ? ` - Rp${product.variantPrices[variant].toLocaleString(
                          "id-ID"
                        )}`
                      : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-8 text-[11px] text-center uppercase font-bold text-gray-500">
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100">
              <ShieldCheck size={20} className="text-green-600" />
              Higienis
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100">
              <Truck size={20} className="text-green-600" />
              Kirim Cepat
            </div>
            <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100">
              <Star size={20} className="text-green-600" />
              Favorit
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />

            <a
              href={`https://wa.me/6281231773663?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-green-700 transition-all"
            >
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}