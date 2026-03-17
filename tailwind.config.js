/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Perbaikan: Menggerakkan posisi background untuk efek kilau
        shine: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        // Efek muncul dari bawah secara halus
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        // Durasi 3 detik agar terlihat elegan dan tidak terlalu cepat (looping)
        shine: 'shine 3s linear infinite',
        // Reveal tetap sekali jalan (forwards)
        reveal: 'reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
      },
    },
  },
  plugins: [],
}