/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#404040",
        "scrollbar-track": "#171717",
      },
      scrollbar: {
        thin: "8px",
        thick: "16px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
