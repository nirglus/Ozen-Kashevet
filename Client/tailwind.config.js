/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        1: ['1'],
        three: ['3'],
        50: ['0.50']
      },
      height: {
        15: '15vh',
        20: '20vh',
        25: '25vh',
        30: '30vh',
        33: '33vh',
        40: '40vh',
        66: '66vh',
        75: '75vh',
        80: '80vh',
        90: '90vh',
        95: '95vh',
      },
      color: {
        120: '120%'
      }

    },
  },
  plugins: [],
}

