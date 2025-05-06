import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class", // 👈 Enables dark mode by adding 'dark' class
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            // Optional: extend colors, fonts, etc.
        },
    },
    plugins: [],
};

export default config;