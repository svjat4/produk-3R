// app/robots.js
export default function robots() {
  const baseUrl = "https://www.jajananmagetan.biz.id";

  return {
    rules: [
      {
        // Default Search Engine (Google, Bing, DuckDuckGo, Yandex)
        userAgent: "*",
        allow: "/",
        disallow: [
          "/keranjang",
          "/checkout",
          "/api/",
          "/admin/",
          "/private/",
        ],
      },
      {
        // GEO & AI Engine Crawlers (ChatGPT, Perplexity, Gemini, Claude, Apple, Meta)
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "Anthropic-AI",
          "Google-Extended",
          "Cohere-ai",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "ByteSpider",
        ],
        allow: "/",
        disallow: [
          "/keranjang",
          "/checkout",
          "/api/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}