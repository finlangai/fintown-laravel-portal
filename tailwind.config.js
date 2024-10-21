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
                full: '999px',
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                'text-Content': '#fff',
                'text-Content-sub': '#E8E8E8',
                'text-link': '#FF8743',
                'text-active': "#25B770",
            },
            backgroundColor: {
                'background-theme': '#1B2E31',
                'background-active': '#274242',
                'custom-button-success': '#25B770',
                'custom-button-warning': '#FF8743',
                'custom-button-error': '#F93C65',
                'custom-button-pending': '#FFFFF',
                'outline-variant': "rgba(192, 201, 192, 0.16)",
                // Thêm nhiều màu nền hơn nếu cần
            },
            spacing: {
                // increment of 4px, 1px = 0.0625em (16px = 1em on default)
                'section-gap': '24px',
                'content-gap': '16px',
                'medium-content-gap': '8px',
                'small-content-gap': '4px',
                'horizontal-padding-container': '40px',
                'vertical-padding-container': '20px',
            }
        },
    },

    plugins: [forms, require("tailwindcss-animate")],
};
