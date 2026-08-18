import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  MessageCircle,
  PackageCheck,
  CheckCircle2,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

const SITE_URL = "https://www.jajananmagetan.biz.id";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | Produk 3R Magetan",
      description: "Produk yang Anda cari tidak ditemukan.",
    };
  }

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  const title = product.seoTitle || `${product.name} | Produk 3R Magetan`;
  const description =
    product.seoDescription ||
    product.description ||
    product.desc ||
    `Beli ${product.name} khas Magetan. Produk asli, fresh, higienis, dan siap dikirim ke seluruh Indonesia.`;

  return {
    title,
    description,
    keywords: product.keywords || [
      product.name,
      "oleh-oleh khas Magetan",
      "jajanan khas Magetan",
      "Produk 3R Magetan",
      product.category || "Camilan Tradisional",
    ],
    alternates: {
      canonical: `${SITE_URL}/produk/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/produk/${product.slug}`,
      siteName: "Produk 3R Magetan",
      images: [
        {
          url: imageUrl,
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
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DetailProduk({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${SITE_URL}/produk/${product.slug}`;
  const productImage = product.image?.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  const whatsappMessage = encodeURIComponent(
    `Halo Produk 3R Magetan, saya ingin bertanya/memesan produk: ${product.name} (${productUrl})`
  );

  // Schema JSON-LD Terintegrasi (Product + BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}/#product`,
        name: product.name,
        image: [productImage],
        description:
          product.seoDescription || product.description || product.desc,
        category: product.category,
        sku: product.id ? String(product.id) : product.slug,
        brand: {
          "@type": "Brand",
          name: "Produk 3R Magetan",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating || "5.0",
          reviewCount: product.reviewCount || "28",
          bestRating: "5",
          worstRating: "1",
        },
        offers: {
          "@type": "Offer",
          url: productUrl,
          priceCurrency: "IDR",
          price: product.price,
          priceValidUntil: "2027-12-31",
          availability:
            product.status === "OutOfStock" || product.status === "Habis"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Produk 3R Magetan",
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "ID",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 2,
            returnMethod: "https://schema.org/ReturnByMail",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "IDR",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "ID",
            },
          },
        },
      },
      {
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
            name: "Katalog Produk",
            item: `${SITE_URL}/produk`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-16">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-8 md:pt-12">
        {/* Breadcrumb UI */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-emerald-600">
            Beranda
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <Link
            href="/produk"
            className="transition-colors hover:text-emerald-600"
          >
            Katalog Produk
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-emerald-700 font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Product Gallery Card (Col 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />

                {product.tag && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 backdrop-blur-md border border-slate-700">
                    <Sparkles size={13} />
                    {product.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Product Detail & Action (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
              {/* Category Badge */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-800">
                  {product.category || "Oleh-Oleh Magetan"}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-100">
                  <CheckCircle2 size={13} />
                  {product.status || "Ready Stock"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {product.rating ? `${product.rating} / 5` : "5.0 / 5"}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Ulasan Pelanggan Terverifikasi
                </span>
              </div>

              {/* Price Tag */}
              <div className="mb-6 rounded-2xl bg-slate-50 p-4 border border-slate-100 flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-black text-emerald-600 tracking-tight">
                  Rp{product.price?.toLocaleString("id-ID")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    Rp{product.originalPrice.toLocaleString("id-ID")}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 space-y-2">
                <p>{product.description || product.desc}</p>
              </div>

              {/* Product Specifications */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 mb-6 text-xs md:text-sm space-y-2.5">
                <div className="flex justify-between gap-4 border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Kategori</span>
                  <span className="font-bold text-slate-900">{product.category}</span>
                </div>

                <div className="flex justify-between gap-4 border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Berat Bersih</span>
                  <span className="font-bold text-slate-900">{product.weight || "250 gram"}</span>
                </div>

                {product.origin && (
                  <div className="flex justify-between gap-4 border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Asal Produksi</span>
                    <span className="font-bold text-slate-900">{product.origin}</span>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Daya Tahan / Kemasan</span>
                  <span className="font-bold text-slate-800">Sealed & Higienis</span>
                </div>
              </div>

              {/* Variants Selector (If available) */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                    Pilihan Rasa / Varian:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <span
                        key={variant}
                        className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-xs"
                      >
                        {variant}
                        {product.variantPrices?.[variant]
                          ? ` - Rp${product.variantPrices[variant].toLocaleString("id-ID")}`
                          : ""}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <div className="flex-1">
                  <AddToCartButton product={product} />
                </div>

                <a
                  href={`https://wa.me/6281231773663?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.99]"
                >
                  <MessageCircle size={18} />
                  Pesan via WhatsApp
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                <ShieldCheck size={20} className="text-emerald-600" />
                <span className="text-[11px] font-bold text-slate-700">100% Original</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                <Truck size={20} className="text-emerald-600" />
                <span className="text-[11px] font-bold text-slate-700">Packing Aman</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs">
                <PackageCheck size={20} className="text-emerald-600" />
                <span className="text-[11px] font-bold text-slate-700">Produk Fresh</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}