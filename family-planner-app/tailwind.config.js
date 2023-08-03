/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        'nc': '2000px',
      },
      boxShadow: {
        'tn' : '0 2px 5px #696969',
        'bn' : '0 0 10px #696969',
      },
    },
    screens: {
      'sm': '300px',
      'md': '550px',
      'lg': '900px',
    },
  },
  plugins: [],
};
