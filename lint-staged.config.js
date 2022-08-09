module.exports = {
  "./**/*.{js,ts,jsx,tsx}": ["prettier --write", "eslint --fix"],
  "*.json": ["prettier --write"],
  "*.py": ["python -m black"],
};
