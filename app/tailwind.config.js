import { preset as Core } from "@sk-web-gui/core";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: ".sk-serviceroot",
  corePlugins: {
    preflight: false,
  },

  blocklist: [],
  theme: {
    extend: {
      borderWidth: {
        customwidth: "var(--sk-spacing-border-custom-width)",
        bubble: "var(--sk-spacing-border-bubble)",
      },
      borderColor: {
        customcolor: "var(--sk-colors-border-custom-color)",
      },
      screens: {
        ismobile: "var(--sk-screens-ismobile)",
      },
      colors: {
        header: {
          background: "var(--sk-colors-header-background)",
          text: {
            primary: "var(--sk-colors-header-text-primary)",
            secondary: "var(--sk-colors-header-text-secondary)",
            link: "var(--sk-colors-header-text-link)",
            "link-hover": "var(--sk-colors-header-text-link-hover)",
          },
        },
        bubble: {
          surface: "var(--sk-colors-bubble-surface)",
          "surface-hover": "var(--sk-colors-bubble-surface-hover)",
          text: "var(--sk-colors-bubble-text)",
          bordercolor: "var(--sk-color-bubble-bordercolor)",
        },
        "dark-link": "var(--sk-colors-dark-link)",
        "dark-link-hover": "var(--sk-colors-dark-link-hover)",
      },
    },
  },

  presets: [
    Core({
      plugin: { cssBase: true, components: ["AIServiceModule"] },
    }),
  ],
};
