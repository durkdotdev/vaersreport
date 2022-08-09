module.exports = {
  extends: ["next", "plugin:tailwindcss/recommended", "prettier"],
  plugins: ["simple-import-sort", "tailwindcss", "unused-imports"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "simple-import-sort/imports": "error",
    "tailwindcss/no-custom-classname": "off",
    "unused-imports/no-unused-imports": "error",
  },
};
