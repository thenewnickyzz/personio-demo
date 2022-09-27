/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
        },
        extend: {
            fontFamily: {
                sans: ["Poppins"],
            },

            colors: {
                text: colors.zinc,
                primary: colors.amber,
                background: colors.zinc[50],
            },
        },
    },
}
