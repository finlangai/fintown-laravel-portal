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
        "text-Content": "#333333",
        "text-Content-sub": "#555555",
        "text-head-main": "#ffffff",
        "text-head": "#cbd5e1",
        "text-link": "#FF8743",
        "text-active": "#25B770",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        },
      },
      backgroundColor: {
        "background-theme": "#fff",
        "background-active": "#FAFBFE",
        "background-sibar": "#313A46",
        "background-head": "gainsboro",
        "custom-button-success": "#25B770",
        "custom-button-warning": "#3682E7",
        "custom-button-error": "#F93C65",
        "custom-button-pending": "#FFFFF",
        "accent-color": "#25B770",
        "accent-color-sub": "#178D4A",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#F0F5EE",
        "surface-container": "#EAEFE8",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
    },
  },

  plugins: [
    forms,
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
  ],
};
