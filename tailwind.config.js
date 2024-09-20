import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                'text-Content': '#fff',
                'text-Content-sub': '#E8E8E8',
                'text-link' : '#FF8743',
                'text-active' : "#25B770"
            },
            backgroundColor: {
                'background-theme': '#1B2E31',
                'background-active': '#274242',
                'custom-button-success': '#25B770',
                'custom-button-warning': '#FF8743',
                'custom-button-error': '#F93C65',
                'custom-button-pending': '#FFFFF',
                // Thêm nhiều màu nền hơn nếu cần
            },
        },
    },

    plugins: [forms, require("tailwindcss-animate")],
};
