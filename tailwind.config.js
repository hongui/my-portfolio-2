/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx}"   // 额外保险
  ],
  theme: {
    extend: {
      // 可选：强制加大一些大标题的基础大小（防止字体过小）
      fontSize: {
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '9xl': ['6rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}
