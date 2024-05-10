import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "bg-sky-500",
                secondary: "bg-sky-600",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".hover-gradient": {
                    "background-image":
                        "linear-gradient(to right, #0ea5e9, #22d3ee, #14b8a6))",
                },
                ".hover-gradient:hover": {
                    "background-image":
                        "linear-gradient(to right, #0ea5e9, #22d3ee, #14b8a6)",
                },
            };

            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
